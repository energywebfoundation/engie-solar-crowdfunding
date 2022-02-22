// import { Contract } from "ethers";
const Contract = require("ethers").Contract;
const Staking = require("../ethers").Staking;
// import { Staking } from "../ethers";

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
  const EWC_CLAIM_MANAGER_ADDRESS = "0x23b026631A6f265d17CFee8aa6ced1B244f3920C";
  const VOLTA_CLAIM_MANAGER_ADDRESS = "0xC3dD7ED75779b33F5Cfb709E0aB02b71fbFA3210";

  return hardhatNetwork === 'ewc' ? EWC_CLAIM_MANAGER_ADDRESS : VOLTA_CLAIM_MANAGER_ADDRESS;
}

const deployContract = async (contractName : string) => {
  const answer = _prompt(`\t${emoji.emojify(":warning:")}\tYou are about to deploy ${contractName} contract to ${process.env.HARDHAT_NETWORK} network. This will consume some EWT. Do you Confirm ? (Y/n) :  `) as string;

  checkAnswer(answer);
  console.log(`\t${emoji.emojify(":hourglass_flowing_sand:")} Deploying ${contractName} ...`);
  
  const Contract = await ethers.getContractFactory(contractName);

  const claimManagerAddress = getClaimManagerAddress(process.env.HARDHAT_NETWORK);

  try {
    const deployedContract = await Contract.deploy(
      claimManagerAddress,
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

const deploy = async () => {  
    const stakingPoolContract = await deployContract("Staking");
    //Find a wait to export contract address, i.e deployedContract.address
    return stakingPoolContract.address
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
