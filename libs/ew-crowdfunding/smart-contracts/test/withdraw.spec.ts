import { expect } from "chai";
import { Contract } from "ethers";
import {impersonateAccount, time} from "@nomicfoundation/hardhat-network-helpers";

let staking: Contract;
let defaultSigner: any;

describe("Production Withdrawal Testing", () => {

  const oneEWT = ethers.utils.parseEther("1");
  const expectedTotalStaled = oneEWT.mul(20000);

  const staker = "0xC3571714248588C6E19cDECe2778B75341b2c288";
  const stakingAddress = "0x8df330b8966ebE69Be996653e50252c6D44a527a";

  beforeEach(async () => {
    await impersonateAccount(staker);
    defaultSigner = await ethers.getSigner(staker, "hardhat");

    staking = await ethers.getContractAt("Staking", stakingAddress, defaultSigner);
  });
  it("Should correclty connect to the forked staking contract", async () => {
  
    const staked = await staking.totalStaked();


    expect(staked).to.be.equal(expectedTotalStaled);
  });
  
  it("Should revert if user tries to withdraw before the end of the campaign", async () => {
     // Redeem transaction should fail before the end of the campaign
    await expect(
      staking.redeemAll()
    ).to.be.revertedWith("Withdraws not allowed");
  });

  it("Should be able to withdraw after the end of the campaign", async () => {

    const releaseDate = await staking.endDate();
    const userExpectedRewards = await staking.getRewards();

    console.log(
      `expected withdrawal for staker ${defaultSigner.address} == ${ethers.utils.formatEther(userExpectedRewards)} EWT`
    );

    // forwarding time to be after the release date
    time.increaseTo(+releaseDate.add(1));

    const beforeBalance = await ethers.provider.getBalance(defaultSigner.address);

    console.log(`Balance before withdraw: ${ethers.utils.formatEther(beforeBalance)} EWT`);

    const tx = await staking.connect(defaultSigner).redeemAll();

    await expect(tx).to.emit(staking, "Withdrawn");

    expect(tx).to.changeEtherBalance(defaultSigner, userExpectedRewards);

    const afterBalance = await ethers.provider.getBalance(defaultSigner.address);

    console.log(`Balance after withdraw: ${ethers.utils.formatEther(afterBalance)} EWT`);
  });
});
