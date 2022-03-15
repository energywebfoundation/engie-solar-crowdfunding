
import { utils } from "ethers";

const calculateRewards = (totalStaked : number) => {
  const interests = totalStaked * 0.12 
  return utils.parseUnits((totalStaked + interests).toString(), "ether");
}

async function main() {
  const contractName = process.env.CONTRACT_NAME || "Staking"
  const contract = await ethers.getContractFactory(contractName);

  const stakingPool = contract.attach(deployedAddress); //TO-DO: connect as signer

  const totalStaked = Number((await stakingPool.totalStaked()).toString())
  const rewards = calculateRewards(totalStaked);

  await stakingPool.depositRewards({value: rewards});

  console.log(`Sending rewards ${rewards.toString()} (${ethers.utils.formatEther(rewards)})`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });