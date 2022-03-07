const _emoji = require("node-emoji");
const prompt_ = require("prompt-sync")();
const deployedAddress = require('../src/lib/deployedAddress').deployedAddress;

const throwError = (errorMessage : string) => {
  throw (`\n\x1b[31m${errorMessage}\x1b[0m\n`);
}

const _checkAnswer = (answer : string, promptMode = "noLoop") => {
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

const getEWTAmount = (field: string, emoji?: string) => {
    console.log("\n");
    const value = prompt_(`${emoji ? _emoji.emojify(emoji) : ""} Enter ${field} (in EWT) : `);
    return ethers.utils.parseUnits(value, "ether");
}

const getDate = (label : string) => {
    console.log("\n");
    const date = prompt_(`${_emoji.emojify(":calendar:")} Enter the ${label} date (YYYY-MM-DD h:mm:ss) : `);
    if (date){
        console.log(label , " date : ", new Date(date).toLocaleString());
        return Math.floor(new Date(date).getTime());
    } else {
        throwError("DateERROR: No date entered ...")
    }
}

const formatDate = (date: string | undefined): number | undefined => {
  if (!date) {
    return;
  }
  return Math.floor(new Date(date).getTime()) / 1000;
}

const getInitParams = async (_deployedContract : typeof Contract) => {
    const signupStart = (formatDate(process.env.SIGNUP_START) || getDate("signupStart")) as number;
    const signupEnd = (formatDate(process.env.SIGNUP_END) || getDate("signupEnd")) as number;
    const startDate = (formatDate(process.env.START_DATE) || getDate("Start")) as number;
    const endDate = (formatDate(process.env.END_DATE) || getDate("End")) as number;
    const hardCap = (process.env.HARDCAP || getEWTAmount("hardCap", ":moneybag:")) as number;
    const contributionLimit = (process.env.CONTRIBUTION_LIMIT || getEWTAmount("contributionLimit", ":lock:")) as number;
    const minRequiredStake = (process.env.MIN_REQUIRED_STAKE || getEWTAmount("minRequiredStake", ":arrow_heading_up:")) as number;
    return {
        hardCap,
        endDate,
        startDate,
        signupEnd,
        signupStart,
        minRequiredStake,
        contributionLimit,
    }
  
}

const initializeContract = async (_deployedContract : typeof Contract) => {

    const {
        hardCap,
        endDate,
        startDate,
        signupEnd,
        signupStart,
        minRequiredStake,
        contributionLimit,
    } = await getInitParams(_deployedContract);
    
    console.log(
      `\n\t\tInit params:

            Signup start = ${new Date(signupStart * 1000)} (unix timestamp)
            Signup end = ${new Date(signupStart * 1000)} (unix timestamp)
            Start Date = ${new Date(signupStart * 1000)} (unix timestamp)
            End Date = ${new Date(signupStart * 1000)} (unix timestamp)
            HardCap = ${hardCap} wei
            Contribution Limit = ${contributionLimit} wei
            Minimum required stake = ${minRequiredStake} wei
      `,
    );

    const answer = prompt_("Do you want to initialize the contract ? (Y/n) ");
    _checkAnswer(answer as string, "loop");
  
    console.log(`
    \t${_emoji.emojify(":fuelpump:")} Initializing contract ...`
    );
    

    try {
      const tx = await _deployedContract.init(
        signupStart,
        signupEnd,
        startDate,
        endDate,
        hardCap,
        contributionLimit,
        minRequiredStake,
      );
  
      console.log(`\t Transaction hash :  ${tx.hash}\n`);
  
      await tx.wait();
  
      console.log(
        `${_emoji.emojify(":large_green_circle:")} Staking Pool ${_deployedContract.address} initialized
        
        \t* start date : ${new Date(startDate! * 1000).toLocaleString()}
        \t* end   date : ${new Date(endDate! * 1000).toLocaleString()} \n`,
      );
    } catch (error) {
      console.log(
        `\n${_emoji.emojify(":red_circle:")} An error occurred during contract initialization :\n\t ==> ${error}`,
      );
    }
};

const init = async (contractAddress : string) => {
  const contractName = process.env.CONTRACT_NAME || "Staking"
  if (contractAddress){
    try {
      console.log(`Initialing ${contractName} contract:`, contractAddress)

      const Contract = await ethers.getContractFactory(contractName);
      const stakingPoolContract = Contract.attach(contractAddress);
  
      await initializeContract(stakingPoolContract);
    } catch(err) {
      const error = err as string
      throw(new Error(error));
    }
  } else {
    throwError(` Contract address not found : \n\tPlease set contract address or make sure that ${contractName} contract is deployed`)
  }
}
  
init(deployedAddress)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });