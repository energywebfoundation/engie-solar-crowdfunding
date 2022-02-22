import { expect, use } from "chai";
import { Staking } from "../ethers";
import { MockProvider, solidity, deployContract, loadFixture, deployMockContract } from "ethereum-waffle";
import StakingContract from "../artifacts/contracts/Staking.sol/Staking.json";
import { Wallet, utils, BigNumber, ContractTransaction } from "ethers";
import { DateTime } from "luxon";
import { abi } from '../artifacts/contracts/libs/IClaimManager.sol/IClaimManager.json';
import { timeStamp } from "console";

use(solidity);
let end : number;
let start : number;
let patron: Wallet;
let owner : Wallet;
let patron2: Wallet;
let patron3: Wallet;
let asOwner : Staking;
let asPatron : Staking;
let asPatron2: Staking;
let asPatron3: Staking;
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
//const patronRole = utils.namehash('patron.Role');
// const serviceProviderRole = utils.namehash('service.Role');
const nullAddress = '0x0000000000000000000000000000000000000000';
//email.roles.verification.apps.energyweb.iam.ewc
const patronRole = utils.namehash("email.roles.verification.apps.energyweb.iam.ewc"); // 0xd83104a5ca54632eb1cb11c562631db005434d589ddd5945399e64672b7d944e (volta)
                                                                                       // 0xf38d9dea0045e3374755be597c94e71e067bc00d8cd8c6bb2e556e3ae1ad573c (dev)

                                                                                       
const serviceProviderRole = utils.namehash("email.roles.eea.apps.florin.engietestvolta.iam.ewc"); //0xe00e224c60394052a994978cde84b44e76076341daafc2a0194b1a8d06a1e453

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

describe("[ Crowdfunding Staking contract ] ", () => {
  const claimManagerABI = abi;
  const oneEWT = utils.parseUnits("1", "ether");
  const hardCap = oneEWT.mul(10000);
  const rewards = oneEWT.mul(9000);
  const contributionLimit = oneEWT.mul(200);
  
  const getReward = (amount : BigNumber) => {
    const interests = amount.mul((rewards.div(hardCap)));
    return amount.add(interests);
  }

  async function fixture(
    start: number,
    [owner, patron, patron2, patron3, notEnrolled]: Wallet[],
    provider: MockProvider,
  ) {
    //set endDate 1 year ahead
    const end = Number(DateTime.fromSeconds(start).plus({year: 1}).toSeconds().toFixed(0));
    const claimManagerMocked = await deployMockContract(owner, claimManagerABI);
    console.log('ClaimManager address >> ', claimManagerMocked.address);
    console.log('Patron Role >> ', patronRole);
    console.log('Service Provider Role >> ', serviceProviderRole);
    const stakingContract = (await deployContract(owner, StakingContract, [
      claimManagerMocked.address,
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
    .withArgs(notEnrolled.address, patronRole, defaultRoleVersion)
    .returns(false);

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
      notEnrolled,
      stakingContract,
      contributionLimit,
      claimManagerMocked,
      asOwner: stakingContract.connect(owner),
      contractAddress: stakingContract.address,
      asPatron: stakingContract.connect(patron),
      asPatron2: stakingContract.connect(patron2),
      asPatron3: stakingContract.connect(patron3),
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
    asOwner = params.asOwner;
    asPatron = params.asPatron;
    provider = params.provider;
    asPatron2 = params.asPatron2;
    asPatron3 = params.asPatron3;
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

  });

  describe("\n+ Testing Staking & Widthdrawal", () => {

    it('Refunds when added stake exceeds contributionlimit', async () => {
      const beforeStake = await asPatron3.balanceOf(patron3.address);
      // overflow = amountSent - (contributionLimit - amountStaked);
      const overflow = contributionLimit.add(oneEWT.mul(42)).sub(contributionLimit.sub(beforeStake));
      await expect(asPatron3.stake({
              value: contributionLimit.add(oneEWT.mul(42))
          }),
      ).to.emit(asPatron3, 'RefundExceeded').withArgs(patron3.address, contributionLimit.add(oneEWT.mul(42)), overflow);
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
              value: oneEWT.mul(3)
          }),
      ).changeEtherBalance(asPatron, oneEWT.mul(3));
      await expect(_tx).to.emit(asPatron, 'Transfer').withArgs(nullAddress, patron.address, oneEWT.mul(3));
  
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
      expect(await asPatron.balanceOf(patron.address)).equals(oneEWT.mul(3));
    });

    it("Can stake several times before startDate", async () => {
      let _tx;
      await expect(
         _tx = await asPatron.stake({
              value: oneEWT.mul(4)
          }),
      ).changeEtherBalance(asPatron, oneEWT.mul(4));
  
      expect(await asPatron.balanceOf(patron.address)).equals(oneEWT.mul(7));
      await expect(_tx).to.emit(asPatron, 'Transfer').withArgs(nullAddress, patron.address, oneEWT.mul(4));

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
      await expect(
        await asPatron2.stake({
            value: oneEWT.mul(7)
        }),
      ).changeEtherBalance(asPatron2, oneEWT.mul(7));
  
      expect(tx = await asPatron2.redeem(oneEWT.mul(5))).changeEtherBalance(asPatron2, (oneEWT.mul(-5)));
      const { blockNumber } = await tx.wait();
      const { timestamp } = await provider.getBlock(blockNumber);
      await expect(tx).to.emit(stakingContract, 'Withdrawn').withArgs(patron2.address, oneEWT.mul(5), timestamp);
    });

    it('Checks SLT Token burning on withdraw', async () => {
      const { blockNumber } = await tx.wait();
      const { timestamp } = await provider.getBlock(blockNumber);
      await expect(tx).to.emit(stakingContract, 'TokenBurnt').withArgs(patron2.address, oneEWT.mul(5), timestamp);
      expect(await asPatron.balanceOf(patron2.address)).equals(oneEWT.mul(2));
    });

    it('fails when trying to withdraw more funds than staked', async () => {
      await expect(
        asPatron2.redeem(oneEWT.mul(15))
      ).to.be.revertedWith('Not enough EWT at stake');
    });
  
    it('Can withdraw all funds before start date', async () => {
      let tx;
      expect(tx = await asPatron.redeemAll()).changeEtherBalance(asPatron, (oneEWT.mul(-7)));
      const { blockNumber } = await tx.wait();
      const { timestamp } = await provider.getBlock(blockNumber);
  
      await expect(tx).to.emit(stakingContract, 'Withdrawn').withArgs(patron.address, oneEWT.mul(7), timestamp);
    });
  
    it('fails when service provider sends reward before startDate', async () => {
      await expect(asOwner.depositRewards({value: oneEWT.mul(10)})).revertedWith('Contract not activated');
    });
  })

  describe("\n+ Testing contract Pausing & Unpausing", () => {

      it("Can Pause contract", async () => {
        tx = await asOwner.pause();
        await expect(tx).to.emit(stakingContract, 'StatusChanged').withArgs('contractPaused', timeStamp);
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
        await expect(asOwner.unPause()).to.emit(stakingContract, 'StatusChanged').withArgs('contractUnpaused', timeStamp);
      });
  
      it("Can stake after unpause", async () => {
        await expect(
          tx = await asPatron2.stake({
               value: oneEWT.mul(1)
           }),
       ).changeEtherBalance(asPatron2, oneEWT.mul(1));
       await expect(tx).to.emit(asPatron2, 'Transfer').withArgs(nullAddress, patron2.address, oneEWT.mul(1));
      });
  })

  describe("\n+ Testing interactions on activated contract (after startDate and before endDate)", () => {
    it('fails when trying to stake after startDate', async () => {
      const { blockNumber } = await tx.wait();
      const { timestamp } = await provider.getBlock(blockNumber);
      const afterStart = start - timestamp + 42000;
      await timeTravel(provider, afterStart);
      await expect(
        asPatron.stake({value: 1})
      ).to.be.revertedWith('Signup Ended');
    });
    
    it('fails when non service provider sends reward on inactive contract', async () => {
      await expect(asPatron.depositRewards({value: oneEWT.mul(10)})).revertedWith('Not enrolled as service provider');
    });
    
    it('can receive rewards when contract is activated', async () => {
      const getTimestamp = async (transaction : ContractTransaction) => {
        const { blockNumber } = await transaction.wait();
        const { timestamp } = await provider.getBlock(blockNumber);
        return timestamp;
      }
      expect(tx = await asOwner.depositRewards({
        value: rewards
      })).to.emit(stakingContract, 'RewardSent').withArgs(owner.address, rewards, await getTimestamp(tx));
      await expect(tx).changeEtherBalance(asOwner, rewards);
    });
    
    it('fails when depositing reward more than once', async () => {
      await expect(asOwner.depositRewards({value: oneEWT.mul(10)})).revertedWith('Already funded');
    })

    it('can check rewards of users', async () => {
      const balance = await asPatron2.balanceOf(patron2.address);
      const expectedReward = getReward(balance);
      const patronReward = await asPatron2.getRewards();
      expect(patronReward).to.equal(expectedReward);
    });

    it('fails if user checks rewards without shares', async () => {
      expect(asPatron.getRewards()).to.be.revertedWith('error: withdraw 0 EWT');
    });

    it('fails when trying to withdraw partially after startDate and before end', async () => {
      await expect(
        asPatron.redeem(oneEWT.mul(1))
      ).to.be.revertedWith('Withdraws not allowed');
    });

    it('fails when trying to unstake all funds after startDate and before end', async () => {
      await expect(
        asPatron.redeemAll()
      ).to.be.revertedWith('Withdraws not allowed');
    });

    it('Can partially withdraw funds after end date', async () => {
      //Moving to endDate
      await timeTravel(provider, end);
      let tx;
      const expectedReward = getReward(oneEWT);
      expect(tx = await asPatron2.redeem(oneEWT)).changeEtherBalance(asPatron2, (expectedReward.mul(-1)));
      const { blockNumber } = await tx.wait();
      const { timestamp } = await provider.getBlock(blockNumber);
      await expect(tx).to.emit(stakingContract, 'Withdrawn').withArgs(patron2.address, expectedReward, timestamp);
    });
    
    it('Can withdraw all funds after end date', async () => {
      let tx;
      const patronBalance = await asPatron2.balanceOf(patron2.address);
      const expectedReward = getReward(patronBalance);
      expect(tx = await asPatron2.redeemAll()).changeEtherBalance(asPatron2, (expectedReward.mul(-1)));
      const { blockNumber } = await tx.wait();
      const { timestamp } = await provider.getBlock(blockNumber);
      await expect(tx).to.emit(stakingContract, 'Withdrawn').withArgs(patron2.address, expectedReward, timestamp);
    });

    it('fails when not enrolled user tries to withdraw', async () => {
      await asPatron3.approve(owner.address, oneEWT)
      await asOwner.transferFrom(patron3.address, notEnrolled.address, oneEWT.div(2));
      await expect(asNotEnrolled.redeemAll()).to.be.revertedWith('No patron role');
    });

    it('fails when service provider sends reward after endDate', async () => {
      await expect(asOwner.depositRewards({value: oneEWT.mul(10)})).revertedWith('Contract not activated');
    });
  });

  describe("\n + Testing campaign cancellation ", () => {

    it("fails terminating campaign if non owner tries to terminate", async () => {
      await expect(asPatron.terminate()).to.be.revertedWith("Must be the admin");
    });

    it("Can terminate campaign", async () => {
      await expect(asOwner.terminate()).to.emit(stakingContract, "CampaignAborted").withArgs(timeStamp);
    });

    it('fails when service provider sends reward after campaign abortion', async () => {
      await expect(asOwner.depositRewards({value: oneEWT.mul(10)})).revertedWith('Campaign aborted');
    });
  })
});
