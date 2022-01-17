import { ethers } from "hardhat";
import { expect, use } from "chai";
import { Staking } from "../ethers";
import { BigNumber, Wallet } from "ethers";
import { MockProvider, solidity, deployContract, loadFixture } from "ethereum-waffle";
import StakingContract from "../artifacts/contracts/Staking.sol/Staking.json";

use(solidity);

describe("Staking", function () {

  async function fixture(
    start: number,
    [owner, patron]: Wallet[],
    provider: MockProvider,
  ) {
    const duration = 3600 * 24 * 30;
    const end = start + duration;

    const stakingContract = (await deployContract(owner, StakingContract)) as Staking;


    return {
      stakingContract,
      patron,
      owner,
      asPatron: stakingContract.connect(patron),
      asOwner: stakingContract.connect(owner),
      provider,
      duration,
      start,
      end,
    };
  }

  async function defaultFixture(wallets: Wallet[], provider: MockProvider) {
    const { timestamp } = await provider.getBlock("latest");
    const start = timestamp + 10;

    return fixture(start, wallets, provider);
  }
  it("fails when non owner tries to initialize",  async () => {
    const { start, asPatron } = await loadFixture(
      defaultFixture,
    );

    await expect(asPatron.init(start)).to.be.revertedWith('Must be the admin');
  });
});
