# ENGIE Energy Access Crowdfund for Solar - Staking

## Description
 
The Staking module of `ENGIE Crowdfund for Solar` is a solidity-based project built with advanced [Hardhat](https://hardhat.org/) and Typescript configuration. 

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
To run those scripts, you need to have valid `.env` file.

1. Copy the [.env.example](https://github.com/energywebfoundation/engie-solar-crowdfunding/blob/master/libs/ew-crowdfunding/smart-contracts/.env.example) file :
```sh
cp .env.example .env
```
2. Adapt the parameters to fit your needs


#### Deploying a new contract on volta

``` sh
$ npm run deploy:volta
```

#### Deploying a new contract on EnergyWeb Chain

``` sh
$ npm run deploy:ewc
```
### Initialize a new deployed contract :
- On Volta
``` sh
$ npm run init:volta
```
- On EnergyWeb Chain
``` sh
$ npm run init:ewc
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
