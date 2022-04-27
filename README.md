

# ENGIE Energy Access Crowdfund for Solar

## Architecture

**General structure** 

The ENGIE Crowdfund for Solar project is architectured as a [monorepo](https://monorepo.tools/#what-is-a-monorepo) and was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="142"></p>

Nx is a smart, fast and extensible build system with first class monorepo support and powerful integrations.

The monorepo contains two main folders:  (an apps folder and a libs folder)

- [apps](https://github.com/energywebfoundation/engie-solar-crowdfunding/tree/master/apps) : here the main applications are implemented. This folder contains:
  - [ew-crowdfunding](https://github.com/energywebfoundation/engie-solar-crowdfunding/tree/master/apps/ew-crowdfunding) - our [NextJS](https://nextjs.org/) Dapp
  - [ew-crowdfunding-e2e](https://github.com/energywebfoundation/engie-solar-crowdfunding/tree/master/apps/ew-crowdfunding-e2e) - end to end testing folder for ew-crowdfunding

- [libs](https://github.com/energywebfoundation/engie-solar-crowdfunding/tree/master/libs) : in this folder, reusable libraries are implemented and used by the apps. It contains:

  - [smart-contracts](https://github.com/energywebfoundation/engie-solar-crowdfunding/tree/master/libs/ew-crowdfunding/smart-contracts): This folder represents the blockchain component of the `Engie Crowdfund for Solar` project and contains the smart contracts implementing the staking module.

> Note: In order to be used in your apps, any new library must have its path added in the [tsconfig.base.json](https://github.com/energywebfoundation/engie-solar-crowdfunding/blob/master/tsconfig.base.json) file :

- example: 
```sh
  ...
  "paths": {
      "@engie-solar-crowdfunding/ew-crowdfunding/smart-contracts": ["libs/ew-crowdfunding/smart-contracts/src/index.ts"],

      "@engie-solar-crowdfunding/<Path_to_new_Library>/": ["libs/<Path_to_new_Library>/src/index.ts"]
    },
    ...
```

---
**The Front-End architecture**

The front-end is built with the React framework and uses the main following libraries :

- React :

      React is a JavaScript library for building user interfaces. React is made for building interactive UIs. Declarative views make the code more predictable and easier to debug. React is component based. It enables building encapsulated components that manage their own state.

- Next.js :

      Nextjs is an open-source development framework built on top of Node.js enabling React based web applications functionalities such as server-side rendering and generating static-websites.
      
- Material-UI :

      Material UI provides a robust, customizable, and accessible library of foundational and advanced components, enabling companies to build their own design system and develop React applications faster.

- Redux :

      Redux helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. This is used along Redux-Thunk as the main state management solution.

- iam-client-lib :

      A TypeScript library to be used within decentralized applications for authentication and authorization using DIDs (Decentralized Identifiers) and VCs (Verifiable Credentials).

- react-hook-form :

      An easy to use React library used for form validation.
----

**Interaction with the iam-client-lib**


- All interactions with the `iam-client-lib` are done by the actions inside the Redux store.

- Actions are implemented inside the redux-store → web3 → actions.

- Actions are connecting with iam-client-lib through a function called `getIamService.ts`.

- To initialize iam-client-lib, two methods need to be called : `setCacheConfig` and `setChainConfig`.

- All other interactions are done only after the user logs in with his/her provider (MetaMask).

- The provider is passed as a parameter to the `getSignerService` from iam-client-lib.



---

## Setup, install and local test

1. Clone the current repository in a local repository :

  - (ssh connection)

```sh
git clone git@github.com:energywebfoundation/engie-solar-crowdfunding.git
```

- or (https connection)

```sh
git clone https://github.com/energywebfoundation/engie-solar-crowdfunding.git
```

2. Navigate to the new created repository :
```sh
cd engie-solar-crowdfunding
```

3. install dependencies

```sh
npm install
```

4. Nivigate to the apps folder and copy the `.env` template file to set local variables
```sh
cd apps/ew-crowdfunding
cp .env.example .env
```

5. Inside your `.env` file, update the following dates (those dates will track the main dates of the campaign's timeline) :

>  _Note_ 
>
> The dates should all be formated as follows : **YYYY-MM-DDTHH:mm** where :
>
> - YYYY : year (ex: 2022)
> - MM : Month (ex: 03 for april)
> - DD : Day (ex: 29)
> - T: Time - expressed in 24h format (ex 17:00)
>
> The previous parameters will be configured as `2022-03-29T17:00` 
>
> _All dates should be **in UTC timezone**_

```
NEXT_PUBLIC_ACTIVATE_STAKING_DATE="2022-03-25T17:00"
NEXT_PUBLIC_CLOSE_STAKING_DATE="2022-03-28T17:00"
NEXT_PUBLIC_LOCK_STAKES_DATE= "2022-03-28T17:30"
NEXT_PUBLIC_RELEASE_REWARDS_DATE="2023-03-28T17:00"
NEXT_PUBLIC_FULL_STOP_DATE="2023-09-29T17:00"
```

6. Make sure you have a valid testing smart-contract.

You can navigate to the smart-contract folder and refer to the corresponding [documentation](https://github.com/energywebfoundation/engie-solar-crowdfunding/blob/master/libs/ew-crowdfunding/smart-contracts/README.md#engie-crowdfund-for-solar---staking).

7. Start the app
```sh
npm start
```

8. Open your browser to http://localhost:4200/

## Deploying
The deployment process will follow the same steps as described for the local testing above. The main differences are on `step 4 and 5`.

Instead of setting a `.env` file, update the dates into the [cf-deploy.yml](https://github.com/energywebfoundation/engie-solar-crowdfunding/blob/master/.github/workflows/cf-deploy.yml) file inside the `.github/workflows` repository:
```sh
echo "::set-output name=next_public_activate_staking_date::2022-03-25T17:00"
echo "::set-output name=next_public_close_staking_date::2022-03-28T17:00"
echo "::set-output name=next_public_lock_stakes_date::2022-03-28T17:30"
echo "::set-output name=next_public_release_rewards_date::2023-03-28T17:00"
echo "::set-output name=next_public_full_stop_date::2023-09-29T17:00"
```
- For a deployment on development branch, update those variables from lines 45 to 50;

- For a deployment on master branch, update those variables from lines 70 to 74;


🔎 **Smart, Fast and Extensible Build System**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@engie-solar-crowdfunding/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.



## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
