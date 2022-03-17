import { expect, use } from 'chai';
import { Staking } from '../ethers';
import { MockProvider, solidity, deployContract, loadFixture, deployMockContract } from 'ethereum-waffle';
import StakingContract from '../artifacts/contracts/Staking.sol/Staking.json';
import { Wallet, utils, BigNumber, ContractTransaction } from 'ethers';
import { DateTime } from 'luxon';
import { timeStamp } from "console";
import { abi } from '../artifacts/contracts/interfaces/IClaimManager.sol/IClaimManager.json';

use(solidity);
let end: number;
let start: number;
let patron: Wallet;
let patron2: Wallet;
let patron3: Wallet;
let owner: Wallet;
let asOwner: Staking;
let asPatron: Staking;
let asPatron2: Staking;
let asPatron3: Staking;
let signupEnd: number;
let timestamp : number;
let signupStart: number;
let contractAddress: string;
let provider: MockProvider;
let stakingContract: Staking;

const tokenSymbol = 'SLT';
const defaultRoleVersion = 1;
const tokenName = 'SOLAR TOKEN';
const serviceProviderRole = utils.namehash("email.roles.verification.apps.energyweb.iam.ewc"); // 0x7309fb6c9050c8da31473134bb210fe29586cbd6fe98004193a8b25d6689e29e (volta)
                                                                                 
const patronRole = utils.namehash("email.roles.eea.apps.florin.engietestvolta.iam.ewc"); //0xc698f14ed8d60937e445046f6dea1406c03e7e0adce8d7a2a43a5ffaa35f7621

const timeTravel = async (provider: MockProvider, seconds: number) => {
  await provider.send('evm_increaseTime', [seconds]);
  await provider.send('evm_mine', []);
};

const initializeContract = async (
  contract: Staking,
  start: number,
  end: number,
  hardCap: BigNumber,
  contributionLimit: BigNumber,
  signupStart: number,
  signupEnd: number,
  minRequiredStake: BigNumber,
): Promise<ContractTransaction> => {
  const fullStop = Number(DateTime.fromSeconds(end).plus({months: 3}).toSeconds().toFixed(0));

  const transaction = await contract.init(
    signupStart,
    signupEnd,
    start,
    end,
    fullStop,
    hardCap,
    contributionLimit,
    minRequiredStake
  );

  return transaction;
};

describe('[ Rewards calculation ] ', () => {
  const claimManagerABI = abi;
  const oneEWT = utils.parseUnits('1', 'ether');
  const hardCap = oneEWT.mul(247);
  const rewards = oneEWT.mul(1000);
  const contributionLimit = oneEWT.mul(200);
  const minRequiredStake = oneEWT.div(2);

  async function fixture(
    start: number,
    [owner, patron, patron2, patron3, notEnrolled]: Wallet[],
    provider: MockProvider,
  ) {
    //set endDate 1 year ahead
    const end = Number(DateTime.fromSeconds(start).plus({ year: 1 }).toSeconds().toFixed(0));
    const claimManagerMocked = await deployMockContract(owner, claimManagerABI);
    const rewardProvider = owner.address;

    const stakingContract = (await deployContract(owner, StakingContract, [
      claimManagerMocked.address,
      rewardProvider,
      serviceProviderRole,
      patronRole,
      tokenName,
      tokenSymbol,
    ])) as Staking;

    signupStart = Number(DateTime.now().toSeconds().toFixed(0));
    //Signup period ends 1 day before startDay
    signupEnd = Number(DateTime.fromSeconds(start).minus({ day: 1 }).toSeconds().toFixed(0));

    await claimManagerMocked.mock.hasRole
      .withArgs(owner.address, serviceProviderRole, defaultRoleVersion)
      .returns(true);

    await claimManagerMocked.mock.hasRole
      .withArgs(patron.address, serviceProviderRole, defaultRoleVersion)
      .returns(false);

    await claimManagerMocked.mock.hasRole
      .withArgs(patron2.address, serviceProviderRole, defaultRoleVersion)
      .returns(false);

    await claimManagerMocked.mock.hasRole.withArgs(patron.address, patronRole, defaultRoleVersion).returns(true);

    await claimManagerMocked.mock.hasRole.withArgs(patron2.address, patronRole, defaultRoleVersion).returns(true);

    await claimManagerMocked.mock.hasRole.withArgs(patron3.address, patronRole, defaultRoleVersion).returns(true);

    await claimManagerMocked.mock.hasRole.withArgs(notEnrolled.address, patronRole, defaultRoleVersion).returns(false);

    return {
      end,
      start,
      owner,
      patron,
      patron2,
      patron3,
      provider,
      hardCap,
      signupEnd,
      signupStart,
      stakingContract,
      contributionLimit,
      claimManagerMocked,
      minRequiredStake,
      asOwner: stakingContract.connect(owner),
      contractAddress: stakingContract.address,
      asPatron: stakingContract.connect(patron),
      asPatron2: stakingContract.connect(patron2),
      asPatron3: stakingContract.connect(patron3),
    };
  }

  async function defaultFixture(wallets: Wallet[], provider: MockProvider) {
    const start = Number(DateTime.now().plus({ days: 14 }).toSeconds().toFixed(0));

    return fixture(start, wallets, provider);
  }

  before(async () => {
    const params = await loadFixture(defaultFixture);
    end = params.end;
    start = params.start;
    owner = params.owner;
    patron = params.patron;
    patron2 = params.patron2;
    patron3 = params.patron3;
    asOwner = params.asOwner;
    asPatron = params.asPatron;
    asPatron2 = params.asPatron2;
    asPatron3 = params.asPatron3;
    provider = params.provider;
    signupEnd = params.signupEnd;
    signupStart = params.signupStart;
    contractAddress = params.contractAddress;
    stakingContract = params.stakingContract;
  });

  describe('\n+ Testing Staking & Widthdrawal & Redemption flow', () => {
    const testStakedAmount = 3.77;
    const deposit : BigNumber = ethers.utils.parseEther(testStakedAmount.toString());

    it('Should handle floating values of the reward', async () => {
      const tx = await initializeContract(asOwner, start, end, hardCap, contributionLimit, signupStart, signupEnd, minRequiredStake);
      const { blockNumber } = await tx.wait();
      timestamp = (await provider.getBlock(blockNumber)).timestamp;

      await expect(tx).to.emit(stakingContract, 'StakingPoolInitialized').withArgs(timestamp, start, end);

      await asPatron.stake({
        value: deposit,
      });
      await asPatron2.stake({
        value: oneEWT.mul(5),
      });
      const balance = await asPatron.balanceOf(patron.address);
      const balance2 = await asPatron2.balanceOf(patron2.address);
      expect(balance).to.equal(deposit);
      expect(balance2).to.equal(oneEWT.mul(5));
    })
    
    it("Should fail if stake value is less then the minimum required value", async () => {
      await expect(asPatron3.stake(
        {value: oneEWT.mul(4).div(10)}
      )).to.be.revertedWith('Value to low');
    });
    
    it("Should correctly calculate reward without interests before campaign activation", async () => {
      const patronReward = await asPatron.getRewards();
      expect(patronReward).to.eq(deposit);
    });

    it("Should correctly calculate reward with interests after campaign activation", async () => {
           //Moving time on activation time sothat contract can be funded
           const afterStart = start - timestamp + 42000;
           await timeTravel(provider, afterStart);
       
           await asOwner.depositRewards({
             value: rewards,
           });
       
          //  await timeTravel(provider, end);
       
           const expectedReward = await asPatron.getRewards();
       
           /*
             Example implementation:
             // Third test - with 10%
             interest = _amount * 0.1
             reward = interest + stakedAmount
             For amount 3, reward is 0.3
       
             interest = _amount * 1e2 (at the end divide it by 1e3)
             reward = interest + stackedAmount (3.3)
           */
       
           const calculateReward = (): number => {
             const reward = testStakedAmount + testStakedAmount * 0.1;
             if (reward % 1 === 0) {
               return reward;
             }
             return parseFloat((reward).toString());
           };
           expect(ethers.utils.formatEther(expectedReward)).to.eq(calculateReward().toString());
    });

    describe("\n + Testing campaign cancellation ", () => {
      it("Should fail terminating campaign if non owner tries to terminate", async () => {
        await expect(asPatron.terminate()).to.be.revertedWith("Must be the admin");
      });
  
      it("Should terminate campaign", async () => {
        await expect(asOwner.terminate()).to.emit(stakingContract, "CampaignAborted").withArgs(timeStamp);
      });
  
      it('Should fail when patron tries to stake after campaign abortion', async () => {
        await expect(asPatron.stake({value: oneEWT})).to.be.revertedWith('Campaign aborted');
      })
  
      it('Should fail when service provider sends reward after campaign abortion', async () => {
        await expect(asOwner.depositRewards({value: rewards})).revertedWith('Campaign aborted');
      });
  
      it ('should accept freezing on a cancelled contract', async () => {
        const tx = await asOwner.pause();
        await expect(tx).to.emit(stakingContract, 'StatusChanged').withArgs('contractPaused', timeStamp);
      });
  
      it ('should fail on tokens withdrawals if a cancelled contract is frozen', async () => {
        await expect(asPatron2.redeemAll()).to.be.revertedWith("Contract is frozen");
      });
  
      it ('should accept unfreezing on a cancelled contract', async () => {
        await expect(asOwner.unPause()).to.emit(stakingContract, 'StatusChanged').withArgs('contractUnpaused', timeStamp);
      });
  
      it ('should allow tokens withdrawals if a cancelled contract is unfrozen', async () => {
        expect(await asPatron2.balanceOf(patron2.address)).to.equal(oneEWT.mul(5))
        expect(await asPatron2.redeemAll()).changeEtherBalance(asPatron2, (oneEWT.mul(-5)));
      });
    });

  });
});
