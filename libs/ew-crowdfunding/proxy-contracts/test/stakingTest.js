const {
    getSelectors,
    FacetCutAction,
    removeSelectors,
    findAddressPositionInFacets
} = require('../scripts/libraries/diamond.js')

const { expect, assert } = require("chai");

const { deployDiamond } = require('../scripts/deploy.js');

describe("StakingFacet", function () {

    before(async function () {
        diamondAddress = await deployDiamond();
        diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', diamondAddress);
        stakingFacet = await ethers.getContractAt('StakingFacet', diamondAddress);
        accounts = await ethers.getSigners()

    })

     it("User can't withdraw without stakes",  async () => {
        expect(stakingFacet.functions.unstake()).to.be.revertedWith('revert No Ewt at stake');
    })

    it("User can stake",  async () => {
        await stakingFacet.functions.stake({from: accounts[0].address, value: '10000000000000000000'});
        //TO-Do: check all staking parameters updates
    })

    it("User can't stake several times",  async () => {
        expect(
            stakingFacet.functions.stake(
                {from: accounts[0].address, value: '10000000000000000000'}
            )).to.be.revertedWith('Already staking');
    })

    it("User can withdraw", async () => {
        await stakingFacet.functions.unstake();
        //TO-Do: check all unstaking parameters updates
    })
});