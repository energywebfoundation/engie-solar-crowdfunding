import { expect, use } from "chai";
import { Staking } from "../ethers";
import { MockProvider, solidity, deployContract, loadFixture, deployMockContract } from "ethereum-waffle";
import StakingContract from "../artifacts/contracts/Staking.sol/Staking.json";
import { Wallet, utils, BigNumber, ContractTransaction } from "ethers";
import { DateTime } from "luxon";
import { abi } from '../artifacts/contracts/libs/IClaimManager.sol/IClaimManager.json';

use(solidity);
let end : number;
let start : number;
let patron: Wallet;
let patron2: Wallet;
let asOwner : Staking;
let asPatron : Staking;
let asPatron2: Staking;
let signupEnd : number;
let hardCap : BigNumber;
let tokenSymbol: string;
let signupStart : number;
let contractAddress: string;
let provider : MockProvider;
let tx: ContractTransaction;
let stakingContract: Staking;
let contributionLimit : BigNumber;

const nullAddress = '0x0000000000000000000000000000000000000000';
const defaultRoleVersion = 1;
const serviceProviderRole = utils.namehash('service.Role');



const timeTravel = async (provider: MockProvider, seconds: number) => {
  await provider.send("evm_increaseTime", [seconds]);
  await provider.send("evm_mine", []);
};

const initializeContract = async (
    contract : Staking,
    start : number,
    end : number,
    hardCap : BigNumber,
    contributionLimit : BigNumber,
    signupStart : number,
    signupEnd : number
  ) : Promise<ContractTransaction> => {
   const transaction =  await contract.init(
    signupStart,
    signupEnd,
    start,
    end,
    hardCap,
    contributionLimit
    );

    return transaction;
}

describe("Staking", () => {
  const claimManagerABI = abi;
  const oneEWT = utils.parseUnits("1", "ether");

  async function fixture(
    start: number,
    [owner, patron, patron2]: Wallet[],
    provider: MockProvider,
  ) {
    //set endDate 1 year ahead
    const end = Number(DateTime.fromSeconds(start).plus({year: 1}).toSeconds().toFixed(0));
    const hardCap = oneEWT.mul(1000000);
    const contributionLimit = oneEWT.mul(10);
    const claimManagerMocked = await deployMockContract(owner, claimManagerABI);

    const stakingContract = (await deployContract(owner, StakingContract, [
      claimManagerMocked.address,
      serviceProviderRole
    ])) as Staking;

    signupStart = Number(DateTime.now().toSeconds().toFixed(0))
    //Signup period ends 1 day before startDay
    signupEnd = Number(DateTime.fromSeconds(start).minus({day: 1}).toSeconds().toFixed(0));

    await claimManagerMocked.mock.hasRole
          .withArgs(owner.address, serviceProviderRole, defaultRoleVersion)
          .returns(true);

    await claimManagerMocked.mock.hasRole
    .withArgs(patron.address, serviceProviderRole, defaultRoleVersion)
    .returns(false);

    await claimManagerMocked.mock.hasRole
    .withArgs(patron2.address, serviceProviderRole, defaultRoleVersion)
    .returns(false);

    return {
      end,
      start,
      owner,
      patron,
      patron2,
      provider,
      hardCap,
      signupEnd,
      signupStart,
      stakingContract,
      contributionLimit,
      claimManagerMocked,
      asOwner: stakingContract.connect(owner),
      contractAddress: stakingContract.address,
      asPatron: stakingContract.connect(patron),
      asPatron2: stakingContract.connect(patron2)
    };
  }

  async function defaultFixture(wallets: Wallet[], provider: MockProvider) {
    const start = Number(DateTime.now().plus({days: 14}).toSeconds().toFixed(0));

    return fixture(start, wallets, provider);
  }

  before(async () => {
    const params = await loadFixture(defaultFixture);
    end = params.end;
    start = params.start;
    hardCap = params.hardCap;
    patron = params.patron;
    patron2 = params.patron2;
    asOwner = params.asOwner;
    asPatron = params.asPatron;
    provider = params.provider;
    asPatron2 = params.asPatron2;
    signupEnd = params.signupEnd;
    signupStart = params.signupStart;
    contractAddress = params.contractAddress;
    stakingContract = params.stakingContract;
    contributionLimit = params.contributionLimit;
    let claimManager = params.claimManagerMocked;
  })

  it("fails when non owner tries to initialize",  async () => {

    await expect(initializeContract(
      asPatron,
      start,
      end,
      hardCap,
      contributionLimit,
      signupStart,
      signupEnd
      )
    ).to.be.revertedWith('Must be the admin');
  });

  it("fails if startDate is set before signup period",  async () => {
  
    let wrongStart = signupStart;

    //Checking initialization failure on each day during signup period
    while (wrongStart <= signupEnd){
      await expect(initializeContract(
        asOwner,
        wrongStart,
        end,
        hardCap,
        contributionLimit,
        signupStart,
        signupEnd
      )).to.be.revertedWith('Start febore signup period');
      //increment wrongStart to the next day
      wrongStart = Number(DateTime.fromSeconds(wrongStart).plus({day: 1}).toSeconds().toFixed(0));
    }
  });

  it('fails if signup period has wrong configuration', async () => {
    await expect(initializeContract(
      asOwner,
      start,
      end,
      hardCap,
      contributionLimit,
      signupEnd, // Inversion of signup End and signup start (end < start)
      signupStart,
    )).to.be.revertedWith('Wrong signup config');

    await expect(initializeContract(
      asOwner,
      start,
      end,
      hardCap,
      contributionLimit,
      signupStart,
      signupStart, // Setting the same date on signup End and signup start
    )).to.be.revertedWith('Wrong signup config');
  });

  it('fails when staking on non initialized contract', async () => {
    await expect(asPatron.stake(
      {value: 10000}
    )).to.be.revertedWith('Not initialized');
  });

  it('fails when contract is initialized with contributionLimit higher than hardCap', async () => {
    const wrongHardCap = oneEWT.mul(200);
    const wrongContributionLimit = oneEWT.mul(100000);
  
    await expect(initializeContract(
      asOwner,
      start,
      end,
      wrongHardCap,
      wrongContributionLimit,
      signupStart,
      signupEnd
    )).to.be.revertedWith('hardCap exceeded');
  })

  it("Can initialize Contract",  async () => {
    const {
      end,
      start,
      asOwner,
      hardCap,
      provider,
      stakingContract,
      contributionLimit
    } = await loadFixture(
      defaultFixture,
    );

    tx = await initializeContract(asOwner, start, end, hardCap, contributionLimit, signupStart, signupEnd);
    const { blockNumber } = await tx.wait();
    const { timestamp } = await provider.getBlock(blockNumber);

    await expect(tx).to.emit(stakingContract, 'StakingPoolInitialized').withArgs(timestamp, start, end);
  });

  it('fails when staking more than limit', async () => {
    await expect(asPatron.stake({
            value: contributionLimit.add(BigNumber.from(42))
        }),
    ).to.be.revertedWith('Contribution limit exceeded');
  });

  it('Can retrieve token symbol from contract', async () => {
    tokenSymbol = await asPatron.symbol();
    expect(tokenSymbol).equals('SLT');
  });

  it('Checks null balance of SLT before staking', async () => {
    expect(await asPatron.balanceOf(patron.address)).equals(BigNumber.from(0));
    console.log(`[ Before stake ] balance of address ${patron.address} -> ${ (await asPatron.balanceOf(patron.address)).toString()} ${tokenSymbol}`);
  });

  it("Can stake before startDate on initialized contract",  async () => {
    let _tx;
    await expect(
       _tx = await asPatron.stake({
            value: oneEWT.mul(3)
        }),
    ).changeEtherBalance(asPatron, oneEWT.mul(3));
    await expect(_tx).to.emit(asPatron, 'Transfer').withArgs(nullAddress, patron.address, oneEWT.mul(3));

  });

  it('Checks SLT Token mining on staking', async () => {
    expect(await asPatron.balanceOf(patron.address)).equals(oneEWT.mul(3));
    console.log(`[ After stake ] balance of address ${patron.address} -> ${ (await asPatron.balanceOf(patron.address)).toString()} ${tokenSymbol}`);
  });


  it("Can stake several times before startDate", async () => {
    let _tx;
    await expect(
       _tx = await asPatron.stake({
            value: oneEWT.mul(4)
        }),
    ).changeEtherBalance(asPatron, oneEWT.mul(4));

    await expect(_tx).to.emit(asPatron, 'Transfer').withArgs(nullAddress, patron.address, oneEWT.mul(4));
  });

  it('fails when added stake exceeds Contribution Limite', async () => {
    await expect(asPatron.stake({
      value: oneEWT.mul(4)
    })).to.be.revertedWith('Contribution limit exceeded');
  });

  it('fails when trying to unstake all funds without deposit', async () => {
    await expect(asPatron2.withdrawAll()).to.be.revertedWith('No deposit at stake');
  });

  it('fails when trying to partially unstake funds without deposit', async () => {
    await expect(asPatron2.withdraw(2)).to.be.revertedWith('No deposit at stake');
  });

  it('fails when trying to withdraw zero EWT before start', async () => {
    await expect(asPatron.withdraw(0)).to.be.revertedWith('error: withdraw 0 EWT');
  });

  it('Can withdraw partial funds before start date', async () => {
    let tx;
    await expect(
      await asPatron2.stake({
          value: oneEWT.mul(7)
      }),
    ).changeEtherBalance(asPatron2, oneEWT.mul(7));

    expect(tx = await asPatron2.withdraw(oneEWT.mul(5))).changeEtherBalance(asPatron2, (oneEWT.mul(-5)));
    const { blockNumber } = await tx.wait();
    const { timestamp } = await provider.getBlock(blockNumber);
    await expect(tx).to.emit(stakingContract, 'Withdrawn').withArgs(patron2.address, oneEWT.mul(5), timestamp);
  });

  it('Checks SLT Token burning on withdraw', async () => {
    expect(await asPatron.balanceOf(patron2.address)).equals(oneEWT.mul(2));
    console.log(`[ After stake ] balance of address ${patron.address} -> ${ (await asPatron.balanceOf(patron.address)).toString()} ${tokenSymbol}`);
  });

  it('fails when trying to withdraw more funds than staked', async () => {
    await expect(
      asPatron2.withdraw(oneEWT.mul(15))
    ).to.be.revertedWith('Not enough EWT at stake');
  });

  it('Can withdraw all funds before start date', async () => {
    let tx;

    expect(tx = await asPatron.withdrawAll()).changeEtherBalance(asPatron, (oneEWT.mul(-7)));
    const { blockNumber } = await tx.wait();
    const { timestamp } = await provider.getBlock(blockNumber);
    console.log("After withdraw: SLT of address ",patron.address,  await (await asPatron.balanceOf(patron.address)).toString(), await asPatron.symbol());

    await expect(tx).to.emit(stakingContract, 'Withdrawn').withArgs(patron.address, oneEWT.mul(7), timestamp);
  });

  it('fails when trying to stake after startDate', async () => {
    const { blockNumber } = await tx.wait();
    const { timestamp } = await provider.getBlock(blockNumber);
    const afterStart = start - timestamp + 42000;
    await timeTravel(provider, afterStart);
    await expect(
      asPatron.stake({value: 1})
    ).to.be.revertedWith('Staking contributions are no longer accepted');
  });

  it('fails when trying to withdraw partially after startDate and before end', async () => {
    await expect(
      asPatron.withdraw(oneEWT.mul(1))
    ).to.be.revertedWith('Withdraws not allowed');
  });

  it('fails when trying to unstake all funds after startDate and before end', async () => {
    await expect(
      asPatron.withdrawAll()
    ).to.be.revertedWith('Withdraws not allowed');
  });

  it('Can partially withdraw funds after end date', async () => {
    //Moving to endDate
    await timeTravel(provider, end);

    let tx;
    expect(tx = await asPatron2.withdraw(oneEWT)).changeEtherBalance(asPatron2, (oneEWT.mul(-1)));
    const { blockNumber } = await tx.wait();
    const { timestamp } = await provider.getBlock(blockNumber);
    await expect(tx).to.emit(stakingContract, 'Withdrawn').withArgs(patron2.address, oneEWT.mul(1), timestamp);
  });

  it('Can withdraw all funds after end date', async () => {
    let tx;
    expect(tx = await asPatron2.withdrawAll()).changeEtherBalance(asPatron2, (oneEWT.mul(-1)));
    const { blockNumber } = await tx.wait();
    const { timestamp } = await provider.getBlock(blockNumber);
    await expect(tx).to.emit(stakingContract, 'Withdrawn').withArgs(patron2.address, oneEWT.mul(1), timestamp);
  });
})