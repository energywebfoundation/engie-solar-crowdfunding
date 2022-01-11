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
        // await stakingFacet.functions.stake({from: "0x50956097e0814d95B827f1c58766b4245068D93C", value: '10000000000000000000'})
        await stakingFacet.functions.stake({from: "0x50956097e0814d95B827f1c58766b4245068D93C"})
        console.log("Staking Content", stakingFacet);
        console.log("Contract Balance >> ", await ethers.getDefaultProvider().getBalance(diamondAddress));
    })
    
    it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});