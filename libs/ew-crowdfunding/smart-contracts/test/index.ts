import { expect, use } from "chai";
import { Staking } from "../ethers";
import { MockProvider, solidity, deployContract, loadFixture } from "ethereum-waffle";
import StakingContract from "../artifacts/contracts/Staking.sol/Staking.json";
import { DateHandler } from '../scripts/utils/dateUtils';
import { Wallet, utils, BigNumber } from "ethers";

use(solidity);

let end : number;
let start : number;
let asOwner : Staking;
let asPatron : Staking;
let hardCap : BigNumber;
let provider : MockProvider;
let stakingContract : Staking;
let contributionLimit : BigNumber;

describe("Staking", function () {
  const oneEWT = utils.parseUnits("1", "ether");

  async function fixture(
    start: number,
    [owner, patron]: Wallet[],
    provider: MockProvider,
  ) {
    //set endDate 1 year ahead
    const end = Number(DateHandler().add(1, 'years', new Date(start * 1000)));
    const hardCap = oneEWT.mul(1000000);
    const contributionLimit = oneEWT.mul(10);
    const stakingContract = (await deployContract(owner, StakingContract)) as Staking;


    return {
      end,
      start,
      owner,
      patron,
      provider,
      hardCap,
      stakingContract,
      contributionLimit,
      asOwner: stakingContract.connect(owner),
      asPatron: stakingContract.connect(patron)
    };
  }

  async function defaultFixture(wallets: Wallet[], provider: MockProvider) {
    const dateHandler = DateHandler();

    const start = (dateHandler.add(14, 'days')) as number

    return fixture(start, wallets, provider);
  }

  before(async () => {
    const params = await loadFixture(defaultFixture);
        end = params.end;
        start = params.start;
        hardCap = params.hardCap;
        asOwner = params.asOwner;
        asPatron = params.asPatron;
        contributionLimit = params.contributionLimit;
  })

  it("fails when non owner tries to initialize",  async () => {

    await expect(asPatron.init(
      start,
      end,
      hardCap,
      contributionLimit
    )).to.be.revertedWith('Must be the admin');
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
    await expect(asPatron.stake(
      {value: 10000}
    )).to.be.revertedWith('Not initialized');
  });

  it('fails when contract is initialized with contributionLimit higher than hardCap', async () => {
    const wrongHardCap = oneEWT.mul(200);
    const wrongContributionLimit = oneEWT.mul(100000);
  
    await expect(asOwner.init(
      start,
      end,
      wrongHardCap,
      wrongContributionLimit
      )).to.be.revertedWith('hardCap exceeded');
  })

  it("Can set start time 2 weeks ahead initialization date",  async () => {
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

    await expect(tx).to.emit(stakingContract, 'StakingPoolInitialized').withArgs(timestamp, start, end);
  });

  it('fails when staking more than limit', async () => {
    await asOwner.init(
      start,
      end,
      hardCap,
      contributionLimit
    );
   
    await expect(asPatron.stake({
            value: contributionLimit.add(BigNumber.from(42))
        }),
    ).to.be.revertedWith('Stake greater than contribution limit');
  });

  it("Can stake on initialized contract",  async () => {
    await asOwner.init(
      start,
      end,
      hardCap,
      contributionLimit
    );
    await expect(
        await asPatron.stake({
            value: 1
        }),
    ).changeEtherBalance(asPatron, 1);
})
});
