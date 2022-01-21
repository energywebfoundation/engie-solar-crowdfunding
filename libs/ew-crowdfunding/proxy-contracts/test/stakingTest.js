const dotenv = require('dotenv');

const { solidity, loadFixture } = require('ethereum-waffle');

const { expect, assert, use } = require("chai");

const { deployDiamond } = require('../scripts/deploy.js');

const DateHandler = require('../scripts/dateUtils.js');
const date = require('date-and-time');

use(solidity);

const initializeContract = async (
    contract,
    start,
    end,
    hardCap,
    contributionLimit
  ) => {
   const transaction =  await contract.init(
      start,
      end,
      hardCap,
      contributionLimit
    );

    return transaction;
}

const setNextBlockTime = async (provider, seconds) => {
    await provider.send("evm_setNextBlockTimestamp", seconds);
}

// forces block.timestamp to specified blockTime
const setBlockTimeStamp = async (provider, blockTime) => {
    await setNextBlockTime(provider, [blockTime])
}  

const timeTravel = async (provider, seconds) => {
    await provider.send("evm_increaseTime", [seconds]);
    await provider.send("evm_mine", []);
};

describe("StakingFacet", function () {
    const oneEWT = ethers.utils.parseUnits("1", "ether");

    async function fixture(
        start,
        [owner, patron, patron2],
        provider
      ) {
        //set endDate 1 year ahead
        const end = Number(DateHandler().add(1, 'years', new Date(start * 1000)));
        const hardCap = oneEWT.mul(1000000);
        const contributionLimit = oneEWT.mul(10);

        return {
            end,
            owner,
            start,
            patron,
            patron2,
            hardCap,
            provider,
            contributionLimit,
        };
    }

    async function defaultFixture(wallets, provider) {
        const EthersProvider = await ethers.provider;
        const dateHandler = DateHandler();
        const accounts = await ethers.getSigners()
    
        const start = dateHandler.add(14, 'days');
        const fixtureObject = await fixture(start, accounts, EthersProvider);
    
        return fixtureObject;
    }

    before(async function () {
        dateHandler = DateHandler();

        diamondAddress = await deployDiamond();
        params = await loadFixture(defaultFixture);
        diamond = await ethers.getContractAt('Diamond', diamondAddress);
        diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', diamondAddress);
        stakingFacet = await ethers.getContractAt('StakingFacet', diamondAddress);

        end = params.end;
        start = params.start;
        patron = params.patron;
        patron2 = params.patron2;
        hardCap = params.hardCap;
        provider = params.provider;
        asOwner = stakingFacet.connect(params.owner);
        contributionLimit = params.contributionLimit;
        asPatron = stakingFacet.connect(params.patron);
        asPatron2 = stakingFacet.connect(params.patron2)
    })

    it("fails when non owner tries to initialize",  async () => {
        await expect(asPatron.init(
            start,
            end,
            hardCap,
            contributionLimit
        )).to.be.revertedWith('LibDiamond: Must be contract owner');
    });

    it("fails if start time is not 2 weeks ahead initialization",  async () => {
        const wrongStart = await DateHandler().now();
        await expect(asOwner.init(
            wrongStart, 
            end,
            hardCap,
            contributionLimit
        )).to.be.revertedWith('Start date should be at least 2 weeks ahead');
    });

    it('fails when staking on non initialized contract', async () => {
        await expect(asPatron.stake({value: 10000})).to.be.revertedWith('Not initialized');
    });

    it('fails when contract is initialized with contributionLimit higher than hardCap', async () => {
        const wrongContributionLimit = oneEWT.mul(100000);
        const wrongHardCap = oneEWT.mul(200);

        await expect(asOwner.init(
            start,
            end,
            wrongHardCap,
            wrongContributionLimit
            )).to.be.revertedWith('hardCap exceeded');
    })

    it("Can set start time 2 weeks ahead initialization date",  async () => {

        console.log("Start Date :: ", start)
        console.log("End Date :: ", end)

        const tx = await asOwner.init(
            start + 42,
            end,
            hardCap,
            contributionLimit
        );
        const { blockNumber } = await tx.wait();
        const { timestamp } = await provider.getBlock(blockNumber);

        await expect(tx).to.emit(stakingFacet, 'StakingPoolInitialized').withArgs(timestamp, start + 42, end);
    });

    it("User can't withdraw without stakes",  async () => {
        await expect(asPatron.unstake()).to.be.revertedWith('No Ewt at stake');
    });

    it('fails when staking more than limit', async () => {
        await expect(asPatron.stake({
                value: contributionLimit + 42
            }),
        ).to.be.revertedWith('Stake greater than contribution limit');
    });

    it("Can stake before startDate on initialized contract",  async () => {
        const stakeTimeOnSignup = dateHandler.sub(5, 'days', new Date((start) * 1000)); //5 days before startDate
        console.log("Time Travel to ", stakeTimeOnSignup);
        await timeTravel(provider, start - stakeTimeOnSignup);
        await expect(
           await asPatron.stake({
                value: 1
            })
        ).changeEtherBalance(diamond, 1);
    });

    it("fails if patron stakes more than once",  async () => {
       await expect(
            asPatron.stake({
                value: 1
            })).to.be.revertedWith('Already staking');
    });

    it('fails when trying to stake after startDate', async () => {

        const stakeTimeAfterStart = dateHandler.add(5, 'days', new Date(start * 1000)); //5 days after start
        const currentTime = await dateHandler.now();
        
        await timeTravel(provider, (start - currentTime) + (stakeTimeAfterStart - start));
    
        await expect(asPatron2.stake(
          {
            value: 1
          }),
        ).to.be.revertedWith('Staking contributions are no longer accepted');
      });

    // it("User can withdraw", async () => {
    //     await stakingFacet.functions.unstake();
    //     //TO-Do: check all unstaking parameters updates
    // })
});