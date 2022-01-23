import { expect, use } from "chai";
import { Staking } from "../ethers";
import { MockProvider, solidity, deployContract, loadFixture } from "ethereum-waffle";
import StakingContract from "../artifacts/contracts/Staking.sol/Staking.json";
import { DateHandler } from '../scripts/utils/dateUtils';
import { Wallet, utils, BigNumber, ContractTransaction } from "ethers";

use(solidity);

let end : number;
let start : number;
let patron: Wallet;
let asOwner : Staking;
let asPatron : Staking;
let asPatron2: Staking;
let signupEnd : number;
let hardCap : BigNumber;
let signupStart : number;
let provider : MockProvider;
let stakingContract: Staking;
let contributionLimit : BigNumber;

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

const dateHandler = DateHandler();

describe("Staking", () => {
  const oneEWT = utils.parseUnits("1", "ether");

  async function fixture(
    start: number,
    [owner, patron, patron2]: Wallet[],
    provider: MockProvider,
  ) {
    //set endDate 1 year ahead
    const end = Number(dateHandler.add(1, 'years', new Date(start * 1000)));
    const hardCap = oneEWT.mul(1000000);
    const contributionLimit = oneEWT.mul(10);
    const stakingContract = (await deployContract(owner, StakingContract)) as Staking;
    signupStart = await dateHandler.now();
    signupEnd = Number(dateHandler.sub(1, 'days', new Date(start * 1000))); //Signup ends 1 day before startDate


    return {
      end,
      start,
      owner,
      patron,
      provider,
      hardCap,
      signupEnd,
      signupStart,
      stakingContract,
      contributionLimit,
      asOwner: stakingContract.connect(owner),
      asPatron: stakingContract.connect(patron),
      asPatron2: stakingContract.connect(patron2)
    };
  }

  async function defaultFixture(wallets: Wallet[], provider: MockProvider) {
    const start = (dateHandler.add(14, 'days')) as number

    return fixture(start, wallets, provider);
  }

  before(async () => {
    const params = await loadFixture(defaultFixture);
    end = params.end;
    start = params.start;
    hardCap = params.hardCap;
    patron = params.patron;
    asOwner = params.asOwner;
    asPatron = params.asPatron;
    provider = params.provider;
    asPatron2 = params.asPatron2;
    signupEnd = params.signupEnd;
    signupStart = params.signupStart;
    stakingContract = params.stakingContract;
    contributionLimit = params.contributionLimit;
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
      wrongStart = dateHandler.getNextDay(new Date(wrongStart * 1000))
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
    console.log("Start Date :: ", start)
    console.log("End Date :: ", end)

    const tx = await initializeContract(asOwner, start, end, hardCap, contributionLimit, signupStart, signupEnd);
    const { blockNumber } = await tx.wait();
    const { timestamp } = await provider.getBlock(blockNumber);

    await expect(tx).to.emit(stakingContract, 'StakingPoolInitialized').withArgs(timestamp, start, end);
  });

  it('fails when staking more than limit', async () => {
    await initializeContract(asOwner, start, end, hardCap, contributionLimit, signupStart, signupEnd);
   
    await expect(asPatron.stake({
            value: contributionLimit.add(BigNumber.from(42))
        }),
    ).to.be.revertedWith('Stake greater than contribution limit');
  });

  it("Can stake before startDate on initialized contract",  async () => {
    await initializeContract(asOwner, start, end, hardCap, contributionLimit, signupStart, signupEnd);

    await expect(
        await asPatron.stake({
            value: oneEWT.mul(3)
        }),
    ).changeEtherBalance(asPatron, oneEWT.mul(3));
  });

  it("fails if patron stakes more than once", async () => {
    await expect(asPatron.stake({value: 1})).to.be.revertedWith('Already staking');
  });

  it('fails when trying to stake after startDate', async () => {
    const tx = await initializeContract(asOwner, start, end, hardCap, contributionLimit, signupStart, signupEnd);

    const { blockNumber } = await tx.wait();
    const { timestamp } = await provider.getBlock(blockNumber);
    const afterStart = start - timestamp + 42000;
    await timeTravel(provider, afterStart);

    await expect(asPatron2.stake(
      {
        value: 1
      }),
    ).to.be.revertedWith('Staking contributions are no longer accepted');
  });

  it('fails when trying to unstake all funds without deposit', async () => {
    await initializeContract(asOwner, start, end, hardCap, contributionLimit, signupStart, signupEnd);
    await expect(asPatron2.unstakeAll()).to.be.revertedWith('No deposit at stake');
  });

  it('Can withdraw all funds before start date', async () => {
    let tx;
    await initializeContract(asOwner, start, end, hardCap, contributionLimit, signupStart, signupEnd);
    expect(tx = await asPatron.unstakeAll()).changeEtherBalance(asPatron, (oneEWT.mul(-3)));
    const { blockNumber } = await tx.wait();
    const { timestamp } = await provider.getBlock(blockNumber);
    await expect(tx).to.emit(stakingContract, 'Withdrawn').withArgs(patron.address, oneEWT.mul(3), timestamp);
  })
})
