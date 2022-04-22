# Engie Crowdfund for Solar - Staking

## Description
 
The Staking module of `Engie Crowdfund for Solar` is a solidity-based project built with advanced [Hardhat](https://hardhat.org/) and Typescript configuration. 

The module includes :
- a main smart-contract [file](https://github.com/energywebfoundation/engie-solar-crowdfunding/blob/master/libs/ew-crowdfunding/smart-contracts/contracts/Staking.sol)

- an interface to connect to EnergyWeb's [Role Checker](https://github.com/energywebfoundation/on-chain-role-check)

- a script to deploy a new staking contract

- a script to initialize a new deployed staking contract

- unit tests


## Installation

### Requirements

Before installing, download and install Node.js. Node.js 14 until node v16.xxx.

Installation is done using the following commands:

``` sh
$ npm install
```

### Unit Tests
``` sh
$ npm run test
```

### Deploying a new contract
#### Deploying a new contract on volta

To run this script, you need to have valid `.env` file.
``` sh
$ npm run deploy-volta
```

## Questions and Support
For questions and support please use Energy Web's [Discord channel](https://discord.com/channels/706103009205288990/843970822254362664) 

Or reach out to our contributing team members

- TeamMember: email kevin.nzeng@energyweb.org

## Connect with Energy Web
- [Twitter](https://twitter.com/energywebx)
- [Discord](https://discord.com/channels/706103009205288990/843970822254362664)
- [Telegram](https://t.me/energyweb)

## License

This project is licensed under the GNU General Public License v3.0 or later - see the [LICENSE](LICENSE) file for details