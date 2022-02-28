import { expect, use } from 'chai';
import { Staking } from '../ethers';
import { MockProvider, solidity, deployContract, loadFixture, deployMockContract } from 'ethereum-waffle';
import StakingContract from '../artifacts/contracts/Staking.sol/Staking.json';
import { Wallet, utils, BigNumber, ContractTransaction } from 'ethers';
import { DateTime } from 'luxon';
import { abi } from '../artifacts/contracts/libs/IClaimManager.sol/IClaimManager.json';

use(solidity);
let end: number;
let start: number;
let patron: Wallet;
let patron2: Wallet;
let owner: Wallet;
let asOwner: Staking;
let asPatron: Staking;
let asPatron2: Staking;
let signupEnd: number;
let timestamp : number;
let signupStart: number;
let contractAddress: string;
let provider: MockProvider;
let stakingContract: Staking;

const tokenSymbol = 'SLT';
const defaultRoleVersion = 1;
const tokenName = 'SOLAR TOKEN';
const nullAddress = '0x0000000000000000000000000000000000000000';
const patronRole = utils.namehash('email.roles.verification.apps.energyweb.iam.ewc'); // 0xd83104a5ca54632eb1cb11c562631db005434d589ddd5945399e64672b7d944e (volta)
// 0xf38d9dea0045e3374755be597c94e71e067bc00d8cd8c6bb2e556e3ae1ad573c (dev)

const serviceProviderRole = utils.namehash('email.roles.eea.apps.florin.engietestvolta.iam.ewc'); //0xe00e224c60394052a994978cde84b44e76076341daafc2a0194b1a8d06a1e453

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
): Promise<ContractTransaction> => {
  const transaction = await contract.init(signupStart, signupEnd, start, end, hardCap, contributionLimit);

  return transaction;
};

describe('[ Rewards calculation ] ', () => {
  const claimManagerABI = abi;
  const oneEWT = utils.parseUnits('1', 'ether');
  const hardCap = oneEWT.mul(247);
  const rewards = oneEWT.mul(1000);
  const contributionLimit = oneEWT.mul(200);

  async function fixture(
    start: number,
    [owner, patron, patron2, patron3, patron4, notEnrolled]: Wallet[],
    provider: MockProvider,
  ) {
    //set endDate 1 year ahead
    const end = Number(DateTime.fromSeconds(start).plus({ year: 1 }).toSeconds().toFixed(0));
    const claimManagerMocked = await deployMockContract(owner, claimManagerABI);
    const stakingContract = (await deployContract(owner, StakingContract, [
      claimManagerMocked.address,
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

    await claimManagerMocked.mock.hasRole.withArgs(notEnrolled.address, patronRole, defaultRoleVersion).returns(false);

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
      asPatron2: stakingContract.connect(patron2),
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
    asOwner = params.asOwner;
    asPatron = params.asPatron;
    asPatron2 = params.asPatron2;
    provider = params.provider;
    signupEnd = params.signupEnd;
    signupStart = params.signupStart;
    contractAddress = params.contractAddress;
    stakingContract = params.stakingContract;
  });

  describe.only('\n+ Testing Staking & Widthdrawal & Redemption flow', () => {
    const testStakedAmount = 3.77;
    const deposit : BigNumber = ethers.utils.parseEther(testStakedAmount.toString());

    it('Should handle floating values of the reward', async () => {
      
      const tx = await initializeContract(asOwner, start, end, hardCap, contributionLimit, signupStart, signupEnd);
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
       
           await timeTravel(provider, end);
       
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

  });
});
