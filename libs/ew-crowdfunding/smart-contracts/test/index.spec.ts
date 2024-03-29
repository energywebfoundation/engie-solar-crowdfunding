import { expect, use } from "chai";
import { Staking } from "../ethers";
import { MockProvider, solidity, deployContract, loadFixture, deployMockContract } from "ethereum-waffle";
import StakingContract from "../artifacts/contracts/Staking.sol/Staking.json";
import { Wallet, utils, BigNumber, ContractTransaction } from "ethers";
import { DateTime } from "luxon";
import { abi } from '../artifacts/contracts/interfaces/IClaimManager.sol/IClaimManager.json';

use(solidity);
let end : number;
let start : number;
let patron: Wallet;
let owner : Wallet;
let patron2: Wallet;
let patron3: Wallet;
let patron4: Wallet;
let fullStop : number;
let asOwner : Staking;
let asPatron : Staking;
let asPatron2: Staking;
let asPatron3: Staking;
let asPatron4: Staking;
let signupEnd : number;
let notEnrolled: Wallet;
let signupStart : number;
let asNotEnrolled: Staking;
let contractAddress: string;
let provider : MockProvider;
let tx: ContractTransaction;
let stakingContract: Staking;

const tokenSymbol = "SLT";
const defaultRoleVersion = 1;
const tokenName = "SOLAR TOKEN";
const nullAddress = '0x0000000000000000000000000000000000000000';
// const serviceProviderRole = utils.namehash("email.roles.verification.apps.energyweb.iam.ewc"); // 0x7309fb6c9050c8da31473134bb210fe29586cbd6fe98004193a8b25d6689e29e (volta)
const serviceProviderRole = utils.namehash("eeaapproved.roles.eea.apps.engie.auth.ewc"); // 0xac3d6e1fcd0ee5dd4a0a7c2405310bb9588579aeef902b5a4d070137d05033c4 (volta)
                                                                                 
const patronRole = utils.namehash("email.roles.eea.apps.florin.engietestvolta.iam.ewc"); //0xc698f14ed8d60937e445046f6dea1406c03e7e0adce8d7a2a43a5ffaa35f7621

const timeTravel = async (provider: MockProvider, seconds: number) => {
  await provider.send("evm_increaseTime", [seconds]);
  await provider.send("evm_mine", []);
};

const getTimestamp = async (transaction : ContractTransaction) => {
  const { blockNumber } = await transaction.wait();
  const { timestamp } = await provider.getBlock(blockNumber);
  return timestamp;
}

const initializeContract = async (
    contract : Staking,
    start : number,
    end : number,
    fullStop : number,
    hardCap : BigNumber,
    contributionLimit : BigNumber,
    signupStart : number,
    signupEnd : number,
    minRequiredStake: BigNumber,
  ) : Promise<ContractTransaction> => {
 const transaction =  await contract.init(
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
}

describe("[ Crowdfunding Staking contract ] ", () => {
  const claimManagerABI = abi;
  const oneEWT = utils.parseUnits("1", "ether");
  const hardCap = oneEWT.mul(247);
  const rewards = oneEWT.mul(1000);
  const contributionLimit = oneEWT.mul(200);
  const minRequiredStake = oneEWT.div(2);

  const getReward = async (patron: Staking, amount : BigNumber) => {
    let finalReward: BigNumber;
    const totalRewards = await patron.totalRewards()

    if (totalRewards){
      const interests = (amount.mul(10).div(100));
      finalReward = amount.add(interests);
    }
    else {
      finalReward = amount;
    }
    return finalReward;
  }

  async function fixture(
    start: number,
    [owner, patron, patron2, patron3, patron4, patron5, notEnrolled]: Wallet[],
    provider: MockProvider,
  ) {
    //set endDate 1 year ahead
    const end = Number(DateTime.fromSeconds(start).plus({year: 1}).toSeconds().toFixed(0));
    const fullStop = Number(DateTime.fromSeconds(end).plus({months: 6}).toSeconds().toFixed(0));
    const claimManagerMocked = await deployMockContract(owner, claimManagerABI);
    console.log('[ MOCKED ClaimManager address ] >> ', claimManagerMocked.address);
    console.log('Patron Role >> ', patronRole);
    console.log('Service Provider Role >> ', serviceProviderRole);
    const rewardProvider = owner.address;
    const stakingContract = (await deployContract(owner, StakingContract, [
      claimManagerMocked.address,
      rewardProvider,
      serviceProviderRole,
      patronRole,
      tokenName,
      tokenSymbol
    ])) as Staking;

    signupStart = Number(DateTime.now().toSeconds().toFixed(0))
    //Signup period ends 1 day before startDay
    signupEnd = Number(DateTime.fromSeconds(start).minus({day: 1}).toSeconds().toFixed(0));

    await claimManagerMocked.mock.hasRole
          .withArgs(owner.address, serviceProviderRole, defaultRoleVersion)
          .returns(true);

    await claimManagerMocked.mock.hasRole
    .withArgs(owner.address, patronRole, defaultRoleVersion)
    .returns(true);

    await claimManagerMocked.mock.hasRole
    .withArgs(patron.address, serviceProviderRole, defaultRoleVersion)
    .returns(false);

    await claimManagerMocked.mock.hasRole
    .withArgs(patron2.address, serviceProviderRole, defaultRoleVersion)
    .returns(false);

    await claimManagerMocked.mock.hasRole
    .withArgs(patron.address, patronRole, defaultRoleVersion)
    .returns(true);

    await claimManagerMocked.mock.hasRole
    .withArgs(patron2.address, patronRole, defaultRoleVersion)
    .returns(true);

    await claimManagerMocked.mock.hasRole
    .withArgs(patron3.address, patronRole, defaultRoleVersion)
    .returns(true);
    
    await claimManagerMocked.mock.hasRole
    .withArgs(patron4.address, patronRole, defaultRoleVersion)
    .returns(true);

    await claimManagerMocked.mock.hasRole
    .withArgs(patron5.address, patronRole, defaultRoleVersion)
    .returns(true);

    await claimManagerMocked.mock.hasRole
    .withArgs(notEnrolled.address, patronRole, defaultRoleVersion)
    .returns(false);

    return {
      end,
      start,
      owner,
      patron,
      patron2,
      patron3,
      patron4,
      provider,
      hardCap,
      fullStop,
      signupEnd,
      signupStart,
      notEnrolled,
      stakingContract,
      contributionLimit,
      claimManagerMocked,
      minRequiredStake,
      asOwner: stakingContract.connect(owner),
      contractAddress: stakingContract.address,
      asPatron: stakingContract.connect(patron),
      asPatron2: stakingContract.connect(patron2),
      asPatron3: stakingContract.connect(patron3),
      asPatron4: stakingContract.connect(patron4),
      asNotEnrolled: stakingContract.connect(notEnrolled),
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
    owner = params.owner;
    patron = params.patron;
    patron2 = params.patron2;
    patron3 = params.patron3;
    patron4 = params.patron4;
    asOwner = params.asOwner;
    fullStop = params.fullStop;
    asPatron = params.asPatron;
    provider = params.provider;
    asPatron2 = params.asPatron2;
    asPatron3 = params.asPatron3;
    asPatron4 = params.asPatron4;
    signupEnd = params.signupEnd;
    signupStart = params.signupStart;
    notEnrolled = params.notEnrolled;
    asNotEnrolled = params.asNotEnrolled;
    contractAddress = params.contractAddress;
    stakingContract = params.stakingContract;
  })

  describe("\n+ Testing contract Initialization", () => {
    
      it("fails when non owner tries to initialize",  async () => {
    
        await expect(initializeContract(
          asPatron,
          start,
          end,
          fullStop,
          hardCap,
          contributionLimit,
          signupStart,
          signupEnd,
          minRequiredStake
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
            fullStop,
            hardCap,
            contributionLimit,
            signupStart,
            signupEnd,
            minRequiredStake
          )).to.be.revertedWith('Start febore signup period');
          //increment wrongStart to the next day
          wrongStart = Number(DateTime.fromSeconds(wrongStart).plus({day: 1}).toSeconds().toFixed(0));
        }
      });

      it("Should fail if fullStopDate is set at any date before endDate",  async () => {
      
        let wrongStop = signupStart;
    
        //Checking initialization failure on each day until endDate
        while (wrongStop <= end){
          await expect(initializeContract(
            asOwner,
            start,
            end,
            wrongStop,
            hardCap,
            contributionLimit,
            signupStart,
            signupEnd,
            minRequiredStake
          )).to.be.revertedWith('FullStop before endDate');
          //increment wrongStop to the next day
          wrongStop = Number(DateTime.fromSeconds(wrongStop).plus({day: 1}).toSeconds().toFixed(0));
        }
      });
      
      it('fails if signup period has wrong configuration', async () => {
        await expect(initializeContract(
          asOwner,
          start,
          end,
          fullStop,
          hardCap,
          contributionLimit,
          signupEnd, // Inversion of signup End and signup start (end < start)
          signupStart,
          minRequiredStake
        )).to.be.revertedWith('Wrong signup config');
    
        await expect(initializeContract(
          asOwner,
          start,
          end,
          fullStop,
          hardCap,
          contributionLimit,
          signupStart,
          signupStart, // Setting the same date on signup End and signup start
          minRequiredStake
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
          fullStop,
          wrongHardCap,
          wrongContributionLimit,
          signupStart,
          signupEnd,
          minRequiredStake
        )).to.be.revertedWith('Hardcap Exceeded');
      })
      
      it("Can initialize Contract",  async () => {
        const {
          end,
          start,
          asOwner,
          hardCap,
          provider,
          stakingContract,
          contributionLimit,
          minRequiredStake
        } = await loadFixture(
          defaultFixture,
        );
        tx = await initializeContract(
          asOwner,
          start,
          end,
          fullStop,
          hardCap,
          contributionLimit,
          signupStart,
          signupEnd,
          minRequiredStake
        );
        const { blockNumber } = await tx.wait();
        const { timestamp } = await provider.getBlock(blockNumber);
    
        await expect(tx).to.emit(stakingContract, 'StakingPoolInitialized').withArgs(timestamp, start, end);
      });

  });

  describe("\n+ Testing Staking & Widthdrawal", () => {

    it('Refunds when added stake exceeds contributionlimit', async () => {
      const overflow = oneEWT.mul(40);
      await expect(asPatron3.stake({
              value: contributionLimit.add(oneEWT.mul(40))
          }),
      ).to.emit(asPatron3, 'RefundExceeded').withArgs(patron3.address, oneEWT.mul(240), overflow);
      expect(await asPatron3.balanceOf(patron3.address)).equals(contributionLimit);
    });
    
    it('fails when staking more than limit', async () => {
      await expect(asPatron3.stake({
              value: oneEWT
          }),
      ).to.be.revertedWith('Contribution limit reached');
    });

    it('Can retrieve token symbol from contract', async () => {
      const expctedSymbol = await asPatron.symbol();
      expect(expctedSymbol).equals(tokenSymbol);
    });

    it('Checks null balance of SLT before staking', async () => {
      expect(await asPatron.balanceOf(patron.address)).equals(BigNumber.from(0));
    });

    it("Can stake before startDate on initialized contract",  async () => {
      let _tx;
      await expect(
         _tx = await asPatron.stake({
              value: oneEWT.mul(7)
          }),
      ).changeEtherBalance(asPatron, oneEWT.mul(7));
      expect(await asPatron.getDeposit()).to.equal(oneEWT.mul(7));
      await expect(_tx).to.emit(asPatron, 'Transfer').withArgs(nullAddress, patron.address, oneEWT.mul(7));
      await expect(_tx).to.emit(asPatron, 'NewStake').withArgs(patron.address, oneEWT.mul(7), await getTimestamp(_tx));
    });

    it('fails when not enrolled user tries to stake', async () => {
      await expect(asNotEnrolled.stake({
              value: oneEWT
          }),
      ).to.be.revertedWith('No patron role');
    });

    it('Checks SLT Token has 18 decimals', async () => {
      expect(await asPatron.decimals()).equals(18);
    });

    it('Checks SLT Token mining on staking', async () => {
      expect(await asPatron.balanceOf(patron.address)).equals(oneEWT.mul(7));
    });

    it('Should verify that Deposit of user who will receive SLT is initially null', async () => {
      expect(await asOwner.getDeposit()).to.equal(oneEWT.mul(0));
    });
    
    it('Should transfer SLT to another user', async () => {
      tx = await asPatron.transfer(owner.address, oneEWT.mul(4));
      await expect(tx).to.emit(asPatron, 'Transfer').withArgs(patron.address, owner.address, oneEWT.mul(4));
    });

    it('Should increase Deposit of user who received SLT', async () => {
      expect(await asOwner.getDeposit()).to.equal(oneEWT.mul(4));
    });

    it("Can stake several times before startDate", async () => {
      let _tx;
      await expect(
        _tx = await asPatron.stake({
          value: oneEWT.mul(4)
        }),
        ).changeEtherBalance(asPatron, oneEWT.mul(4));
        const { blockNumber } = await _tx.wait();
      const { timestamp } = await provider.getBlock(blockNumber);
      expect(await asPatron.balanceOf(patron.address)).equals(oneEWT.mul(7));
      await expect(_tx).to.emit(asPatron, 'NewStake').withArgs(patron.address, oneEWT.mul(4), timestamp);
    });

    it('Refunds when added stake exceeds HardCap & ContributionLimit', async () => {

      /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
      +  Hardcap = 247 EWT && ContributionLimit = 200                                         +
      +                                                                                       +
      + Staking 242 EWTs while totalStaked = 207 / 247 and userStakes = 7 / 200               +
      +                                                                                       +
      + Expected Results:                                                                     +
      +                 * only 40 EWTs of the 242 will be staked                              +
      +                 * 202 EWTs will be refunded                                           +
      +                                                                                       +
      \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

      const overflow = oneEWT.mul(206);
      await expect(tx = await asPatron.stake({
              value: oneEWT.mul(242)
          }),
      ).to.emit(asPatron, 'RefundExceeded').withArgs(patron.address, oneEWT.mul(242), overflow);
      expect(await asPatron.balanceOf(patron.address)).equals(oneEWT.mul(43));
      
      //Checking that wallet is correctly refunded (i.e only 40 EWTs have been consumed instead of 242)
      await expect(tx).changeEtherBalance(patron, (oneEWT.mul(-36)));
    });

    it('fails when trying to stake more than Hardcap', async () => {
      await expect(asPatron2.stake({ value : oneEWT})).to.be.revertedWith('Hardcap Exceeded');
    });

    it('fails when trying to unstake all funds without deposit', async () => {

      await expect(asPatron2.redeemAll()).to.be.revertedWith('error: withdraw 0 EWT');
    });

    it('fails when trying to partially unstake funds without deposit', async () => {
      await expect(asPatron2.redeem(2)).to.be.revertedWith('No deposit at stake');
    });

    it('fails when trying to withdraw zero EWT before start', async () => {
      await expect(asPatron.redeem(0)).to.be.revertedWith('error: withdraw 0 EWT');
    });
  
    it('Can withdraw partial funds before start date', async () => {
      expect(tx = await asPatron.redeem(oneEWT.mul(40))).changeEtherBalance(asPatron2, (oneEWT.mul(-40)));
      const { blockNumber } = await tx.wait();
      const { timestamp } = await provider.getBlock(blockNumber);
      expect(await asPatron.getDeposit()).to.equal(oneEWT.mul(3));
      await expect(tx).to.emit(stakingContract, 'Withdrawn').withArgs(patron.address, oneEWT.mul(40), timestamp);
    });

    it('Checks SLT Token burning on withdraw', async () => {
      const { blockNumber } = await tx.wait();
      const { timestamp } = await provider.getBlock(blockNumber);
      await expect(tx).to.emit(stakingContract, 'TokenBurnt').withArgs(patron.address, oneEWT.mul(40), timestamp);
      expect(await asPatron.balanceOf(patron.address)).equals(oneEWT.mul(3));
    });

    it('Should allow user who did not stake to partially redeem received SLT', async () => {

      //Verify that redeemed token decreases on smartContract user's balance of the redeemed amount
      await expect(tx = await asOwner.redeem(oneEWT)).changeEtherBalance(asOwner, oneEWT.mul(-1));

      //Verify that redeemed token increases user wallet's balance of the redeemed amount
      await expect(tx).changeEtherBalance(owner, oneEWT.mul(1));
      console.log("Owner balance after first partial redeem: ", await asOwner.balanceOf(owner.address));
    });

    it('fails when trying to withdraw more funds than staked', async () => {
      await expect(
        asPatron.redeem(oneEWT.mul(15))
      ).to.be.revertedWith('Not enough EWT at stake');
    });
  
    it('Can withdraw all funds before start date', async () => {
      let tx;
      await expect(tx = await asPatron.redeemAll()).changeEtherBalance(asPatron, (oneEWT.mul(-3)));
      const { blockNumber } = await tx.wait();
      const { timestamp } = await provider.getBlock(blockNumber);
      await expect(tx).to.emit(stakingContract, 'Withdrawn').withArgs(patron.address, oneEWT.mul(3), timestamp);
    });
  
    it('fails when service provider sends reward before startDate', async () => {
      await expect(asOwner.depositRewards({value: rewards})).revertedWith('Contract not activated');
    });
  })

  describe("\n+ Testing contract Pausing & Unpausing", () => {

      it("Can Pause contract", async () => {
        tx = await asOwner.pause();
        await expect(tx).to.emit(stakingContract, 'StatusChanged').withArgs('contractPaused', await getTimestamp(tx));
      });

      it("should correctly retrieve contract status", async () => {
        const [_isContractInitialized, _isContractPaused, _isContractAborted] =  await asOwner.getContractStatus();
        expect([_isContractInitialized, _isContractPaused, _isContractAborted]).to.eqls([true, true, false]);
      });
  
      it("fails when staking on paused contract", async () => {
        await expect(asPatron3.stake({
               value: oneEWT
           }),
       ).to.be.revertedWith('Contribution limit reached');
      });
  
      it("fails when trying to pause an already paused contract", async () => {
        await expect(asOwner.pause()).to.be.revertedWith("Contract is frozen");
      });
  
      it("fails when trying to withdraw funds on a paused contract", async () => {
        await expect(asOwner.redeemAll()).to.be.revertedWith("Contract is frozen");
      });
  
      it('fails when trying to withdraw partially on paused contract', async () => {
        await expect(
          asPatron2.redeem(oneEWT.mul(1))
        ).to.be.revertedWith("Contract is frozen");
      });
  
      it("Can unPause contract", async () => {
        tx = await asOwner.unPause();
        await expect(tx).to.emit(stakingContract, 'StatusChanged').withArgs('contractUnpaused', await getTimestamp(tx));
        const [_isContractInitialized, _isContractPaused, _isContractAborted] =  await asOwner.getContractStatus();
        expect([_isContractInitialized, _isContractPaused, _isContractAborted]).to.eqls([true, false, false]);

      });
  
      it("Can stake after unpause", async () => {
        //Patron2's stake
        await expect(
          tx = await asPatron2.stake({
               value: oneEWT.mul(2)
           }),
       ).changeEtherBalance(asPatron2, oneEWT.mul(2));
       await expect(tx).to.emit(asPatron2, 'Transfer').withArgs(nullAddress, patron2.address, oneEWT.mul(2));
      
       //patron4's stake
       await expect(
        tx = await asPatron4.stake({
             value: oneEWT.mul(2)
         }),
     ).changeEtherBalance(asPatron4, oneEWT.mul(2));
     await expect(tx).to.emit(asPatron4, 'Transfer').withArgs(nullAddress, patron4.address, oneEWT.mul(2));
      });
  })

  describe("\n+ Testing interactions on activated contract (after startDate and before endDate)", () => {
    it('Should fail when trying to stake after startDate', async () => {
      const { blockNumber } = await tx.wait();
      const { timestamp } = await provider.getBlock(blockNumber);
      const afterStart = start - timestamp + 42000;
      await timeTravel(provider, afterStart);
      await expect(
        asPatron.stake({value: 1})
      ).to.be.revertedWith('Signup Ended');
    });
    
    it('Should fail when non service provider sends reward on active contract', async () => {
      await expect(asPatron.depositRewards({value: rewards})).revertedWith('Not enrolled as service provider');
    });

    it('Should fail when providing not enough rewards on active contract', async () => {
      //Providing less than 12% of totalStaked
      const totalStaked = await asOwner.totalStaked();
      const twelvePercents = totalStaked.mul(oneEWT.mul(12)).div(oneEWT.mul(100));
      console.log("TWELVE PERCENTS of TotalStaked : ", twelvePercents)
      await expect(asOwner.depositRewards({value: oneEWT.mul(23)})).revertedWith('Not Enough rewards');
    });
    
    it('Should receive rewards when contract is activated', async () => {
      
      expect(tx = await asOwner.depositRewards({
        value: rewards
      })).to.emit(stakingContract, 'RewardSent').withArgs(owner.address, rewards, await getTimestamp(tx));
      await expect(tx).changeEtherBalance(asOwner, rewards);
    });
    
    it('Should fail when depositing reward more than once', async () => {
      await expect(asOwner.depositRewards({value: rewards})).revertedWith('Already funded');
    })

    it('Should check rewards of users', async () => {
      const balance = await asPatron2.balanceOf(patron2.address);
      const expectedReward = await getReward(asPatron2, balance);
      const patronReward = (await asPatron2.getRewards());
      expect(patronReward).to.equal(expectedReward);
    });

    it('Should return 0 if user checks rewards without shares', async () => {
      expect(await asPatron.getRewards()).to.eq(0);
    });

    it('Should fail when trying to withdraw partially after startDate and before end', async () => {
      await expect(
        asPatron2.redeem(oneEWT.mul(1))
      ).to.be.revertedWith('Withdraws not allowed');
    });

    it('Should fail when trying to unstake all funds after startDate and before end', async () => {
      await expect(
        asPatron2.redeemAll()
      ).to.be.revertedWith('Withdraws not allowed');
    });

    it('Should partially withdraw funds after end date', async () => {

      //Moving to endDate
      console.log("Time Traveling to end:: ", new Date(end * 1000))
      const { blockNumber } = await tx.wait();
      const { timestamp } = await provider.getBlock(blockNumber);
      const afterEnd = end - timestamp + 42000;
      await timeTravel(provider, afterEnd);
      const allRedeemedRewardsBefore = await asPatron2.allRedeemedRewards();
      const expectedReward = await getReward(asPatron2, oneEWT.mul(1));
      expect(tx = await asPatron2.redeem(oneEWT)).changeEtherBalance(asPatron2, (expectedReward.mul(-1)));

      const allRedeemedRewardsAfter = await asPatron2.allRedeemedRewards();

      const _blockNumber = (await tx.wait()).blockNumber;
      const  _timestamp = (await provider.getBlock(_blockNumber)).timestamp;
      console.log("Date on End :: ", new Date(_timestamp * 1000));
      await expect(tx).to.emit(stakingContract, 'Withdrawn').withArgs(patron2.address, expectedReward, _timestamp);
      const patronBalance = await asPatron2.getDeposit();
      const bonus = patronBalance.div(10);
      const calculatedReward = allRedeemedRewardsBefore.add(bonus)
      expect(allRedeemedRewardsAfter).to.equal(calculatedReward);
    });
    
    it('Should withdraw all funds after end date', async () => {
      let tx;
      const patronBalance = await asPatron2.balanceOf(patron2.address);
      const expectedReward = await getReward(asPatron2, patronBalance);
      const allRedeemedRewardsBefore = await asPatron2.allRedeemedRewards();
      expect(tx = await asPatron2.redeemAll()).changeEtherBalance(asPatron2, (expectedReward.mul(-1)));
      const { blockNumber } = await tx.wait();
      const { timestamp } = await provider.getBlock(blockNumber);
      const allRedeemedRewardsAfter = await asPatron2.allRedeemedRewards();
      const bonus = patronBalance.div(10);
      const calculatedReward = allRedeemedRewardsBefore.add(bonus)
      await expect(tx).to.emit(stakingContract, 'Withdrawn').withArgs(patron2.address, expectedReward, timestamp);
      expect(allRedeemedRewardsAfter).to.equal(calculatedReward);
    });

    it('Should allow user who did not stake to redeem all received SLT', async () => {
      //Verifying that a user who did not stake but received SLT can redeem all SLT and get the 10%
      //Here, "owner" received 3 SLT hence, should receive 3 EWT + 10% of 3 --> 3.3 EWT

      //Verification on smartContract
      await expect(tx = await asOwner.redeemAll()).changeEtherBalance(asOwner, (utils.parseUnits("3.3", "ether")).mul(-1));
      //Verification on wallet
      await expect(tx).changeEtherBalance(owner, utils.parseUnits("3.3", "ether"));
    });

    it('Should fail when not enrolled user tries to withdraw', async () => {
      await asPatron3.approve(owner.address, oneEWT)
      await asOwner.transferFrom(patron3.address, notEnrolled.address, oneEWT.div(2));
      await expect(asNotEnrolled.redeemAll()).to.be.revertedWith('No patron role');
    });

    it('Should fail when service provider sends reward after endDate', async () => {
      await expect(asOwner.depositRewards({value: rewards})).revertedWith('Contract not activated');
    });

    it("Should fail when trying to terminate campaign after release date", async () => {
      await expect(asOwner.terminate()).revertedWith('Error: canceling after campaign');
    });
  });

  describe("\n+ Testing sweeping", () => {
    
    it('Should fail when trying to sweep before FullStop Date ', async () => {
      const endDate = +(await asOwner.endDate()).toString();
      const fullStopDate = +(await asOwner.fullStopDate()).toString();
      console.log("[Before Sweeping] Release Date >> ", endDate, new Date(endDate * 1000));
      console.log("[Before Sweeping] FullStop Date >> ", fullStopDate, new Date(fullStopDate * 1000));
      
      expect(endDate).to.be.lessThan(fullStopDate);
      await expect(asOwner.sweep()).to.be.revertedWith("Cannot sweep before expiry");
    });
    
    it('Should fail when not allowed user tries to sweep contract after FullStop Date ', async () => {
      const { blockNumber } = await tx.wait();
      const { timestamp } = await provider.getBlock(blockNumber);
      const afterFullstop = fullStop - timestamp + 42000;
      await timeTravel(provider, afterFullstop);
      await expect(asPatron.sweep()).to.be.revertedWith("Not allowed to sweep");
    });

    it('Should sweep remaining funds', async () => {
      console.log("Total staked : ", ethers.utils.formatEther(await asOwner.totalStaked()))
      console.log("Total rewards : ", ethers.utils.formatEther(await asOwner.totalRewards()))
      const beforeSweep = Number(ethers.utils.formatEther((await owner.getBalance()).toString()));
      console.log("Balance Before sweep : ", beforeSweep);
      const remainingReward = (await asOwner.totalRewards()).sub(await asOwner.allRedeemedRewards());
      const remainingFunds = await asOwner.totalStaked();
      tx = await asOwner.sweep()
      const {blockNumber} = await tx.wait();
      const { timestamp } = await provider.getBlock(blockNumber)
      console.log("Sweep Time : ", timestamp);
      const afterSweep = Number(ethers.utils.formatEther((await owner.getBalance()).toString()));
      console.log("Balance After sweep : ", afterSweep);

      console.log("Swept >> ", remainingReward);
      expect(afterSweep).to.be.greaterThan(beforeSweep);
      await expect(tx).to.emit(stakingContract, "Swept").withArgs(remainingReward, timestamp);
      //Checking that we send to the rewardProvider wallet remainingRewards + remainingFunds staked (i.e totalStaked)
      await expect(tx).changeEtherBalance(owner, (remainingReward.add(remainingFunds)));
      //Checking that we remove from the contract remainingRewards + remainingFunds staked (i.e totalStaked)
      await expect(tx).changeEtherBalance(asOwner, (remainingReward.add(remainingFunds).mul(-1)));
      
    })

    it('Should reset totalStaked', async () => {
      expect(await asOwner.totalStaked()).to.equal(0);
    });

    it('Should fail when trying to sweep more than once', async () => {
      expect(asOwner.sweep()).to.be.revertedWith("Already sweeped");
    })

  })
});
