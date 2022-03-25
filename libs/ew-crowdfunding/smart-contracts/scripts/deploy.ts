
const fs = require('fs');
const path = require('path');
const Wallet = require('ethers').Wallet;
const Contract = require("ethers").Contract;
const Staking = require("../ethers").Staking;
const _prompt = require("prompt-sync")();

const emoji = require("node-emoji");
const { ethers } = require("hardhat");

const displayContractInfos = (_contractName:string, _contract : typeof Staking) => {
  console.log(`\n[ ${_contractName}'s infos ]`);
  console.log(`\tAddress: ${_contract.address}\n`);
};

const checkAnswer = (answer : string, promptMode = "noLoop") => {
  const isInvalid = (answer : string) => (answer !== "n" && answer !== "N" && answer !== "Y" && answer !== "y");
    if (promptMode === "loop"){
      while (isInvalid(answer)){
        console.log(`\t${emoji.emojify(":rotating_light:")} Invalid option \" ${answer}\" ... Please choose a valid option !`);
        answer = _prompt("Init? (Y/n) ") as string;
      }
    } else {
      if (isInvalid(answer)){
        console.log(`\t${emoji.emojify(":x:")} \"${answer}\" is not a valid option. Aborting ...`);
      }
    }
    if (answer !== "Y" && answer != "y") {
        process.exit(0);
    }
}

const getClaimManagerAddress = (hardhatNetwork : string | undefined) => {
  const claimManagerAddress = (
    hardhatNetwork === 'ewc' ?
    process.env.EWC_CLAIM_MANAGER_ADDRESS 
  : process.env.VOLTA_CLAIM_MANAGER_ADDRESS
  );
  
  return claimManagerAddress;
}

const deployContract = async (contractName : string) => {
  const answer = _prompt(`\t${emoji.emojify(":warning:")}\tYou are about to deploy ${contractName} contract to ${process.env.HARDHAT_NETWORK} network. This will consume some EWT. Do you Confirm ? (Y/n) :  `) as string;

  checkAnswer(answer);
  console.log(`\t${emoji.emojify(":hourglass_flowing_sand:")} Deploying ${contractName} ...`);
  
  const Contract = await ethers.getContractFactory(contractName);

  const claimManagerAddress = getClaimManagerAddress(process.env.HARDHAT_NETWORK);
  const deployer = new Wallet(process.env.DEPLOYER_PRIV_KEY as string);
  const rewardProvider = process.env.REWARD_PROVIDER || deployer.address;

  try {
    const deployedContract = await Contract.deploy(
      claimManagerAddress,
      rewardProvider,
      process.env.SERVICE_ROLE,
      process.env.PATRON_ROLE,
      process.env.TOKEN_NAME,
      process.env.TOKEN_SYMBOL
    );
    displayContractInfos(contractName, deployedContract);
    console.log(`${emoji.emojify(":large_green_circle:")} ${contractName} deployed ${emoji.emojify(":rocket:")}`);

    return deployedContract;
  } catch (error) {
    console.log(`${emoji.emojify(":red_circle:")} An error occurred during contract deployment ${error}`);
    return undefined;
  }
};

const exportContractAddress = async (contractAdress : string): Promise<string> => {
  return await fs.writeFileSync(path.join(__dirname, '..', 'src', 'lib', 'deployedAddress.ts'), `export const deployedAddress = '${contractAdress}';` )
}

const deploy = async () => {  
    const stakingPoolContract = await deployContract("Staking");
    //Find a way to properly expose contract address, i.e deployedContract.address, to the environment
    await exportContractAddress(stakingPoolContract.address);
    return stakingPoolContract.address
}

module.exports = {
  checkAnswer
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
