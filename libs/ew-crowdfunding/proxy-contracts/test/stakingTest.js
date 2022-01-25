const dotenv = require('dotenv');

const { solidity, loadFixture } = require('ethereum-waffle');

const { expect, assert, use } = require("chai");

const { deployDiamond } = require('../scripts/deploy.js');

const DateHandler = require('../scripts/dateUtils.js');

use(solidity);

describe("StakingFacet", function () {
    const oneEWT = ethers.utils.parseUnits("1", "ether");

    async function fixture(
        start,
        [owner, patron],
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
            hardCap,
            provider,
            contributionLimit,
        };
    }

    async function defaultFixture(wallets, provider) {
        const dateHandler = DateHandler();
        const accounts = await ethers.getSigners()
        const EthersProvider = await ethers.provider;
    
        const start = dateHandler.add(14, 'days');
        const fixtureObject = await fixture(start, accounts, EthersProvider);
    
        return fixtureObject;
    }

    async function fixture(
        start,
        [owner, patron],
        provider
      ) {
        //set endDate 1 year ahead
        const end = Number(DateHandler().add(1, 'years', new Date(start * 1000)));
    
        return {
            end,
            owner,
            start,
            patron,
            provider,
        };
    }

    async function defaultFixture(wallets, provider) {
        const dateHandler = DateHandler();
        const accounts = await ethers.getSigners()
        const EthersProvider = await ethers.provider;
    
        const start = dateHandler.add(14, 'days');
        const fixtureObject = await fixture(start, accounts, EthersProvider);
    
        return fixtureObject;
    }

    before(async function () {
        
        diamondAddress = await deployDiamond();
        params = await loadFixture(defaultFixture);
        diamond = await ethers.getContractAt('Diamond', diamondAddress);
        diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', diamondAddress);
        stakingFacet = await ethers.getContractAt('StakingFacet', diamondAddress);

        end = params.end;
        start = params.start;
        patron = params.patron;
        hardCap = params.hardCap;
        provider = params.provider;
        asOwner = stakingFacet.connect(params.owner);
        contributionLimit = params.contributionLimit;
        asPatron = stakingFacet.connect(params.patron);
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
            start,
            end,
            hardCap,
            contributionLimit
        );
        const { blockNumber } = await tx.wait();
        const { timestamp } = await provider.getBlock(blockNumber);

    await expect(tx).to.emit(stakingFacet, 'StakingPoolInitialized').withArgs(timestamp, start, end);
    });

    it("User can't withdraw without stakes",  async () => {
       await expect(asPatron.unstake()).to.be.revertedWith('No Ewt at stake');
    });

    it('fails when staking more than limit', async () => {
        await expect(asPatron.stake({
                value: contributionLimit + 42
            }),
        ).to.be.revertedWith('Stake greater than contribution limit');
    })

    it("Can stake on initialized contract",  async () => {
        await expect(
            await asPatron.stake({
                value: 1
            }),
        ).changeEtherBalance(diamond, 1);
    })

    // it("User can't stake several times",  async () => {
    //     expect(
    //         stakingFacet.functions.stake(
    //             {from: accounts[0].address, value: '3000000000000000000'}
    //         )).to.be.revertedWith('Already staking');
    // })

    // it("User can withdraw", async () => {
    //     await stakingFacet.functions.unstake();
    //     //TO-Do: check all unstaking parameters updates
    // })
});