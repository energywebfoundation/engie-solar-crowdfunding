import { expect } from 'chai';
import { Contract } from 'ethers';
import { stakeList } from './stakersList';
import {
  impersonateAccount,
  stopImpersonatingAccount,
  time,
  setBalance,
} from '@nomicfoundation/hardhat-network-helpers';

let staking: Contract;
let defaultSigner: any;

describe('Production Withdrawal Testing', () => {
  const oneEWT = ethers.utils.parseEther('1');
  const expectedTotalStaled = oneEWT.mul(20000);

  // Replace with the staker address you want to test
  const staker = '0xC3571714248588C6E19cDECe2778B75341b2c288';
  const stakingAddress = '0x8df330b8966ebE69Be996653e50252c6D44a527a';

  beforeEach(async () => {
    await impersonateAccount(staker);
    defaultSigner = await ethers.getSigner(staker, 'hardhat');
    staking = await ethers.getContractAt('Staking', stakingAddress, defaultSigner);
  });

  it('Should correclty connect to the forked staking contract', async () => {
    const staked = await staking.totalStaked();

    expect(staked).to.be.equal(expectedTotalStaled);
  });

  it('Should revert if user tries to withdraw before the end of the campaign', async () => {
    // Redeem transaction should fail before the end of the campaign
    await expect(staking.redeemAll()).to.be.revertedWith('Withdraws not allowed');
  });

  it('All enrolled patrong should be able to withdraw after the end of the campaign', async () => {
    const releaseDate = await staking.endDate();
    // forwarding time to be after the release date
    time.increaseTo(+releaseDate.add(1));
    console.log(`fetching infos for all ${stakeList.length} stakers ...`);
    await Promise.all(
      stakeList.map(async (staker) => {
        await impersonateAccount(staker);
        const currentSigner = await ethers.getSigner(staker, 'hardhat');

        const userExpectedRewards = await staking.connect(currentSigner).getRewards();
        const beforeBalance = await ethers.provider.getBalance(currentSigner.address);
        // adding 1 EWT to the balance to cover the gas cost
        setBalance(currentSigner.address, beforeBalance.add(oneEWT));
        try {
          const tx = await staking.connect(currentSigner).redeemAll();
          await expect(tx).to.emit(staking, 'Withdrawn');
          expect(tx).to.changeEtherBalance(currentSigner, userExpectedRewards);
          const afterBalance = await ethers.provider.getBalance(currentSigner.address);
          console.log(`Staker: ${currentSigner.address}:`);
          console.log(`Balance before withdraw: ${ethers.utils.formatEther(beforeBalance.add(oneEWT))} EWT`);
          console.log(`expected withdrawal ${ethers.utils.formatEther(userExpectedRewards)} EWT`);
          console.log(`Balance after withdraw: ${ethers.utils.formatEther(afterBalance)} EWT`);
        } catch (error) {
          console.log(`Error occurred during withdrawal of account ${staker} :: ${error}`);
        }
        console.log('-------------------');
        await stopImpersonatingAccount(staker);
      }),
    );
  });
});
