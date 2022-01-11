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
    })

    it("User can stake",  async () => {
        await stakingFacet.functions.stake({from: "0x50956097e0814d95B827f1c58766b4245068D93C", value: '1000000000000000000'});
        //TO-Do: check all staking parameters updates
    })

    it("User can't stake several times",  async () => {
        expect(
            stakingFacet.functions.stake(
                {from: "0x50956097e0814d95B827f1c58766b4245068D93C", value: '1000000000000000000'}
            )).to.be.revertedWith('Already staking');
    })
});