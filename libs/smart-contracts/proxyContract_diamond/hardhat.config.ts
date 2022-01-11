
import * as dotenv from "dotenv";

import "solidity-coverage";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import { HardhatUserConfig, task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { defaultAccounts } from "@ethereum-waffle/provider";
dotenv.config();

const deployer_privateKey = process.env.DEPLOYER_PRIV_KEY || defaultAccounts[0].secretKey;

const deployScript = async (networkName : String, hre : HardhatRuntimeEnvironment) => {
  console.log(`Deploting contract to ${networkName}`);
  //TODO wwrite the deploying script

}

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("Deploy", "Deploy the contract the network specified in parameter. Defaulting to volta", deployScript)

const networkNameErrorMessage = `not a recognized network. Please check your configuration. Defaulting to volta`;

const getChainId = (networkName : string = 'volta') => {
  switch(networkName){
    case 'volta':
      return Number(process.env.VOLTA_CHAIN_ID);
    case 'ewc':
      return Number(process.env.EWC_CHAIN_ID);
    default:
      console.log(`[hardhat.config] - ${networkName} is ${networkNameErrorMessage}`);
      return Number(process.env.VOLTA_CHAIN_ID);
  }
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    },
  },
  defaultNetwork: 'ganache',
  networks: {
    volta: {
      url: process.env.VOLTA_URL,
      chainId: getChainId('volta'),
      accounts: [deployer_privateKey],
      gasPrice: 1000000000,
    },
    ewc: {
      url: process.env.EWC_URL,
      chainId: getChainId('ewc'),
      accounts: [deployer_privateKey],
      gasPrice: 1000000000,
    },
    ganache: {
      url: 'http://127.0.0.1:8544',
      chainId: 1337,
      accounts: ['aa50f46e5adfe033f392c790fd907f87b3478707005ca65c0953bdd6bb80b3b1'],
    }
  },
  mocha: {
    timeout: 420000
  },
  
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  typechain: {
    outDir: "ethers",
    target: "ethers-v5",
  },
};

export default config; 