
import { expect, use } from "chai";
import { Staking } from "../ethers";
import { MockProvider, solidity, deployContract, loadFixture } from "ethereum-waffle";
import StakingContract from "../artifacts/contracts/Staking.sol/Staking.json";
import { DateHandler } from '../scripts/utils/dateUtils';
import { Wallet } from "ethers";

use(solidity);

describe("Staking", function () {

  async function fixture(
    start: number,
    [owner, patron]: Wallet[],
    provider: MockProvider,
  ) {
    //set endDate 1 year ahead
    const end = Number(DateHandler().add(1, 'years', new Date(start * 1000)));

    const stakingContract = (await deployContract(owner, StakingContract)) as Staking;


    return {
      stakingContract,
      patron,
      owner,
      asPatron: stakingContract.connect(patron),
      asOwner: stakingContract.connect(owner),
      provider,
      start,
      end,
    };
  }

  async function defaultFixture(wallets: Wallet[], provider: MockProvider) {
    const dateHandler = DateHandler();

    const start = (dateHandler.add(14, 'days')) as number

    return fixture(start, wallets, provider);
  }

  it("fails when non owner tries to initialize",  async () => {
    const { start, end, asPatron } = await loadFixture(
      defaultFixture,
    );

    await expect(asPatron.init(start, end)).to.be.revertedWith('Must be the admin');
  });

  it("fails if start time is not 2 weeks ahead initialization",  async () => {
    const { asOwner, end } = await loadFixture(
      defaultFixture,
    );
    const start = await DateHandler().now();

    await expect(asOwner.init(start, end)).to.be.revertedWith('Start date should be at least 2 weeks ahead');
  });

  it('fails when staking on non initialized contract', async () => {
    const { asPatron } = await loadFixture(
      defaultFixture,
    );
    await expect(asPatron.stake({value: 10000})).to.be.revertedWith('Not initialized');
});

  it("Can set start time 2 weeks ahead initialization date",  async () => {
    const { asOwner, start, end, stakingContract, provider } = await loadFixture(
      defaultFixture,
    );
    console.log("Start Date :: ", start)
    console.log("End Date :: ", end)

    const tx = await asOwner.init(start, end);
    const { blockNumber } = await tx.wait();
        const { timestamp } = await provider.getBlock(blockNumber);

    await expect(tx).to.emit(stakingContract, 'StakingPoolInitialized').withArgs(timestamp, start, end);
  });
});
