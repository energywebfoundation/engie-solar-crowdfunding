const dotenv = require('dotenv');

const { solidity, loadFixture } = require('ethereum-waffle');

const { expect, assert, use } = require("chai");

const { deployDiamond } = require('../scripts/deploy.js');

const DateHandler = require('../scripts/dateUtils.js');

use(solidity);

describe("StakingFacet", function () {

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
        provider = params.provider;
        asOwner = stakingFacet.connect(params.owner);
        asPatron = stakingFacet.connect(params.patron);
    })

    it("fails when non owner tries to initialize",  async () => {
        await expect(asPatron.init(start, end)).to.be.revertedWith('LibDiamond: Must be contract owner');
    });

    it("fails if start time is not 2 weeks ahead initialization",  async () => {
        const wrongStart = await DateHandler().now();
        await expect(asOwner.init(wrongStart, end)).to.be.revertedWith('Start date should be at least 2 weeks ahead');
    });

    it('fails when staking on non initialized contract', async () => {
        await expect(asPatron.stake({value: 10000})).to.be.revertedWith('Not initialized');
    });

    it("Can set start time 2 weeks ahead initialization date",  async () => {
   
    console.log("Start Date :: ", start)
    console.log("End Date :: ", end)

    const tx = await asOwner.init(start, end);
    const { blockNumber } = await tx.wait();
    const { timestamp } = await provider.getBlock(blockNumber);

    await expect(tx).to.emit(stakingFacet, 'StakingPoolInitialized').withArgs(timestamp, start, end);
    });

    it("User can't withdraw without stakes",  async () => {
       await expect(asPatron.unstake()).to.be.revertedWith('No Ewt at stake');
    });

    it("Can stake on initialized contract",  async () => {
        await expect(
            await asPatron.stake({
                value: 10000
            }),
        ).changeEtherBalance(diamond, 10000);
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