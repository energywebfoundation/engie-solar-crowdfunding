/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BytesLike,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Staking, StakingInterface } from "../Staking";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_claimManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "_rewardProvider",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_serviceRole",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_patronRole",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "tokenName",
        type: "string",
      },
      {
        internalType: "string",
        name: "tokenSymbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_timestamp",
        type: "uint256",
      },
    ],
    name: "CampaignAborted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_amout",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_timestamp",
        type: "uint256",
      },
    ],
    name: "NewStake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "refunded",
        type: "uint256",
      },
    ],
    name: "RefundExceeded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "provider",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    name: "RewardSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "initDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_startDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_endDate",
        type: "uint256",
      },
    ],
    name: "StakingPoolInitialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "statusType",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "date",
        type: "uint256",
      },
    ],
    name: "StatusChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_date",
        type: "uint256",
      },
    ],
    name: "Swept",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amout",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_timestamp",
        type: "uint256",
      },
    ],
    name: "TokenBurnt",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_amout",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_timestamp",
        type: "uint256",
      },
    ],
    name: "Withdrawn",
    type: "event",
  },
  {
    inputs: [],
    name: "allRedeemedRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimManagerAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contributionLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "depositRewards",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "endDate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fullStopDate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractStatus",
    outputs: [
      {
        internalType: "bool",
        name: "_isContractInitialized",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_isContractPaused",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_isContractAborted",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDeposit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hardCap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_provider",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_role",
        type: "bytes32",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_signupStart",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_signupEnd",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_startDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_endDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_fullStopDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_hardCap",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_contributionLimit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_minRequiredStake",
        type: "uint256",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minRequiredStake",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "patronRole",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "redeem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "redeemAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "serviceRole",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "signupEnd",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "signupStart",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stake",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "startDate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sweep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sweeped",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "terminate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalStaked",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unPause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620028b4380380620028b4833981016040819052620000349162000251565b8151829082906200004d906003906020850190620000c1565b50805162000063906004906020840190620000c1565b505060108054336001600160a01b03199182161790915560138054600160281b600160c81b031916650100000000006001600160a01b039a8b1602179055600e95909555505050600f55601180549091169190921617905562000331565b828054620000cf90620002f4565b90600052602060002090601f016020900481019282620000f357600085556200013e565b82601f106200010e57805160ff19168380011785556200013e565b828001600101855582156200013e579182015b828111156200013e57825182559160200191906001019062000121565b506200014c92915062000150565b5090565b5b808211156200014c576000815560010162000151565b80516001600160a01b03811681146200017f57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620001ac57600080fd5b81516001600160401b0380821115620001c957620001c962000184565b604051601f8301601f19908116603f01168101908282118183101715620001f457620001f462000184565b816040528381526020925086838588010111156200021157600080fd5b600091505b8382101562000235578582018301518183018401529082019062000216565b83821115620002475760008385830101525b9695505050505050565b60008060008060008060c087890312156200026b57600080fd5b620002768762000167565b9550620002866020880162000167565b6040880151606089015160808a015192975090955093506001600160401b0380821115620002b357600080fd5b620002c18a838b016200019a565b935060a0890151915080821115620002d857600080fd5b50620002e789828a016200019a565b9150509295509295509295565b600181811c908216806200030957607f821691505b602082108114156200032b57634e487b7160e01b600052602260045260246000fd5b50919050565b61257380620003416000396000f3fe6080604052600436106102455760003560e01c80637332e07711610139578063c032846b116100b6578063db006a751161007a578063db006a7514610640578063dd2f35e914610660578063dd62ed3e14610676578063eb013933146106bc578063f7b188a5146106db578063fb86a404146106f057600080fd5b8063c032846b1461058d578063c11aae8c146105d2578063c24a0f8b146105f2578063c399ec8814610608578063ce45ed261461062a57600080fd5b806395d89b41116100fd57806395d89b4114610502578063a457c2d714610517578063a9059cbb14610537578063ac4ab3fb14610557578063af63dda41461057757600080fd5b80637332e0771461048b57806379cc6790146104a15780637c0e77ac146104c1578063817b1cd2146104d75780638456cb59146104ed57600080fd5b806323b872dd116101c7578063395093511161018b57806339509351146103f75780633a4b66f11461041757806342966c681461041f5780634a3642a51461043f57806370a082311461045557600080fd5b806323b872dd1461037b5780632f4350c21461039b578063313ce567146103b057806335faa416146103cc578063386db479146103e157600080fd5b80630c08bf881161020e5780630c08bf881461031b5780630e15561a14610332578063152111f71461034857806318160ddd146103505780631aeae7ba1461036557600080fd5b806216ee161461024a5780630572b0cc1461029057806306fdde03146102b3578063095ea7b3146102d55780630b97bc8614610305575b600080fd5b34801561025657600080fd5b50601354610273906501000000000090046001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561029c57600080fd5b506102a5610706565b604051908152602001610287565b3480156102bf57600080fd5b506102c861075c565b6040516102879190612248565b3480156102e157600080fd5b506102f56102f03660046122b9565b6107ee565b6040519015158152602001610287565b34801561031157600080fd5b506102a5600a5481565b34801561032757600080fd5b50610330610804565b005b34801561033e57600080fd5b506102a560075481565b61033061096b565b34801561035c57600080fd5b506002546102a5565b34801561037157600080fd5b506102a5600e5481565b34801561038757600080fd5b506102f56103963660046122e3565b610bd1565b3480156103a757600080fd5b50610330610c7b565b3480156103bc57600080fd5b5060405160128152602001610287565b3480156103d857600080fd5b50610330610cc0565b3480156103ed57600080fd5b506102a560085481565b34801561040357600080fd5b506102f56104123660046122b9565b610e52565b610330610e8e565b34801561042b57600080fd5b5061033061043a36600461231f565b61141d565b34801561044b57600080fd5b506102a560095481565b34801561046157600080fd5b506102a5610470366004612338565b6001600160a01b031660009081526020819052604090205490565b34801561049757600080fd5b506102a560125481565b3480156104ad57600080fd5b506103306104bc3660046122b9565b611429565b3480156104cd57600080fd5b506102a560145481565b3480156104e357600080fd5b506102a5600d5481565b3480156104f957600080fd5b506103306114af565b34801561050e57600080fd5b506102c8611573565b34801561052357600080fd5b506102f56105323660046122b9565b611582565b34801561054357600080fd5b506102f56105523660046122b9565b61161b565b34801561056357600080fd5b506102f56105723660046122b9565b611628565b34801561058357600080fd5b506102a5600b5481565b34801561059957600080fd5b506013546040805160ff640100000000840481161515825263010000008404811615156020830152909216151590820152606001610287565b3480156105de57600080fd5b506103306105ed36600461235a565b6116b2565b3480156105fe57600080fd5b506102a560065481565b34801561061457600080fd5b50336000908152601560205260409020546102a5565b34801561063657600080fd5b506102a5600c5481565b34801561064c57600080fd5b5061033061065b36600461231f565b6118dc565b34801561066c57600080fd5b506102a5600f5481565b34801561068257600080fd5b506102a56106913660046123af565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b3480156106c857600080fd5b506013546102f590610100900460ff1681565b3480156106e757600080fd5b50610330611bbe565b3480156106fc57600080fd5b506102a560055481565b6013546000906301000000900460ff161561073c5760405162461bcd60e51b8152600401610733906123e2565b60405180910390fd5b3360009081526020819052604081205461075590611c9d565b5091505090565b60606003805461076b9061240e565b80601f01602080910402602001604051908101604052809291908181526020018280546107979061240e565b80156107e45780601f106107b9576101008083540402835291602001916107e4565b820191906000526020600020905b8154815290600101906020018083116107c757829003601f168201915b5050505050905090565b60006107fb338484611cfb565b50600192915050565b6010546001600160a01b0316331461082e5760405162461bcd60e51b815260040161073390612449565b60135460ff16156108765760405162461bcd60e51b8152602060048201526012602482015271105b1c9958591e481d195c9b5a5b985d195960721b6044820152606401610733565b6006544211156108c85760405162461bcd60e51b815260206004820152601f60248201527f4572726f723a2063616e63656c696e672061667465722063616d706169676e006044820152606401610733565b60078054601380546000600581905560098190559384905563ff0000ff191660011790556012919091558015610934576011546040516001600160a01b039091169082156108fc029083906000818181858888f19350505050158015610932573d6000803e3d6000fd5b505b6040514281527f396ef65364c652a5186a005bb7dcf6aac4d2adcb6c6d0adf39a5f13104a2e344906020015b60405180910390a150565b6000600d54607861097c919061248a565b905061098a6103e8826124a9565b600d5461099791906124cb565b3410156109db5760405162461bcd60e51b81526020600482015260126024820152714e6f7420456e6f756768207265776172647360701b6044820152606401610733565b60135460ff1615610a215760405162461bcd60e51b815260206004820152601060248201526f10d85b5c185a59db8818589bdc9d195960821b6044820152606401610733565b600a5442118015610a33575060065442105b610a785760405162461bcd60e51b815260206004820152601660248201527510dbdb9d1c9858dd081b9bdd081858dd1a5d985d195960521b6044820152606401610733565b60135462010000900460ff1615610ac25760405162461bcd60e51b815260206004820152600e60248201526d105b1c9958591e48199d5b99195960921b6044820152606401610733565b60003411610b085760405162461bcd60e51b8152602060048201526013602482015272139bc81c995dd85c991cc81c1c9bdd9a591959606a1b6044820152606401610733565b610b1433600e54611628565b80610b2957506011546001600160a01b031633145b610b755760405162461bcd60e51b815260206004820181905260248201527f4e6f7420656e726f6c6c656420617320736572766963652070726f76696465726044820152606401610733565b3460076000828254610b8791906124cb565b90915550506013805462ff00001916620100001790556040517f6379339f0ae63e95e65fad18ca2a7ec4e7e3f05f3cc5f7079f4d8da8cec34faa90610960903390349042906124e3565b6000610bde848484611e1f565b6001600160a01b038416600090815260016020908152604080832033845290915290205482811015610c635760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b6064820152608401610733565b610c708533858403611cfb565b506001949350505050565b6013546301000000900460ff1615610ca55760405162461bcd60e51b8152600401610733906123e2565b33600090815260208190526040902054610cbe906118dc565b565b610ccc33600e54611628565b80610ce157506011546001600160a01b031633145b610d245760405162461bcd60e51b815260206004820152601460248201527304e6f7420616c6c6f77656420746f2073776565760641b6044820152606401610733565b601354610100900460ff1615610d6e5760405162461bcd60e51b815260206004820152600f60248201526e105b1c9958591e481cddd9595c1959608a1b6044820152606401610733565b600c54421015610dc05760405162461bcd60e51b815260206004820152601a60248201527f43616e6e6f74207377656570206265666f7265206578706972790000000000006044820152606401610733565b6000600854600d54610dd29190612504565b6013805461ff0019166101001790556011546040519192506001600160a01b03169082156108fc029083906000818181858888f19350505050158015610e1c573d6000803e3d6000fd5b50604080518281524260208201527f8ca6abf6b1c0bd37b098133cb9c8a94eb36b3f0f859bbca87c56b032880f5b359101610960565b3360008181526001602090815260408083206001600160a01b038716845290915281205490916107fb918590610e899086906124cb565b611cfb565b60135460ff1615610ed45760405162461bcd60e51b815260206004820152601060248201526f10d85b5c185a59db8818589bdc9d195960821b6044820152606401610733565b601354640100000000900460ff16610f205760405162461bcd60e51b815260206004820152600f60248201526e139bdd081a5b9a5d1a585b1a5e9959608a1b6044820152606401610733565b60003411610f625760405162461bcd60e51b815260206004820152600f60248201526e139bc81155d5081c1c9bdd9a591959608a1b6044820152606401610733565b6009544210610fa25760405162461bcd60e51b815260206004820152600c60248201526b14da59db9d5c08115b99195960a21b6044820152606401610733565b600554600d5410610fe85760405162461bcd60e51b815260206004820152601060248201526f12185c9918d85c08115e18d95959195960821b6044820152606401610733565b60125433600090815260156020526040902054106110485760405162461bcd60e51b815260206004820152601a60248201527f436f6e747269627574696f6e206c696d697420726561636865640000000000006044820152606401610733565b6013546301000000900460ff16156110725760405162461bcd60e51b8152600401610733906123e2565b6014543410156110b35760405162461bcd60e51b815260206004820152600c60248201526b56616c756520746f206c6f7760a01b6044820152606401610733565b6110bf33600f54611628565b6110fc5760405162461bcd60e51b815260206004820152600e60248201526d4e6f20706174726f6e20726f6c6560901b6044820152606401610733565b6012543360009081526015602052604090205461111a9034906124cb565b1061133b573360009081526015602052604081205460125461113c9190612504565b6111469034612504565b905060006111548234612504565b905060055481600d5461116791906124cb565b10611275576000600d5460055461117e9190612504565b6111889083612504565b905060006111968284612504565b336000908152601560205260408120805492935083929091906111ba9084906124cb565b909155506111ca90503382611fee565b604051428152819033907f55595f34fd936311e65eca0a752ee70068b8992fdf64918aff1b6345689c84e49060200160405180910390a37fef3402545c3e64e30583a48b60392700e20c20e1e2406dce9d340c9b54c476fc333461122e85886124cb565b60405161123d939291906124e3565b60405180910390a180600d600082825461125791906124cb565b9091555061126f905061126a83866124cb565b6120cd565b50505050565b33600090815260156020526040812080548392906112949084906124cb565b909155506112a490503382611fee565b604051428152819033907f55595f34fd936311e65eca0a752ee70068b8992fdf64918aff1b6345689c84e49060200160405180910390a37fef3402545c3e64e30583a48b60392700e20c20e1e2406dce9d340c9b54c476fc33348460405161130e939291906124e3565b60405180910390a180600d600082825461132891906124cb565b909155506113379050826120cd565b5050565b60055434600d5461134c91906124cb565b1061139f576000600d546005546113639190612504565b61136d9034612504565b9050600061137b8234612504565b336000908152601560205260408120805492935083929091906112949084906124cb565b33600090815260156020526040812080543492906113be9084906124cb565b9091555050604051428152349033907f55595f34fd936311e65eca0a752ee70068b8992fdf64918aff1b6345689c84e49060200160405180910390a36114043334611fee565b34600d600082825461141691906124cb565b9091555050565b611426816118dc565b50565b60006114358333610691565b9050818110156114935760405162461bcd60e51b8152602060048201526024808201527f45524332303a206275726e20616d6f756e74206578636565647320616c6c6f77604482015263616e636560e01b6064820152608401610733565b6114a08333848403611cfb565b6114aa83836120fa565b505050565b6010546001600160a01b031633146114d95760405162461bcd60e51b815260040161073390612449565b6013546301000000900460ff16156115035760405162461bcd60e51b8152600401610733906123e2565b6013805463ff0000001916630100000017905560408051818152600e918101919091526d18dbdb9d1c9858dd14185d5cd95960921b60608201524260208201527f5921431fa16f8be49d0a0175ba96d394094d37c61ef3ecd3985329c254cd108a906080015b60405180910390a1565b60606004805461076b9061240e565b3360009081526001602090815260408083206001600160a01b0386168452909152812054828110156116045760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608401610733565b6116113385858403611cfb565b5060019392505050565b60006107fb338484611e1f565b601354604051634aefbd8f60e11b81526000916501000000000090046001600160a01b03169081906395df7b1e9061166990879087906001906004016124e3565b602060405180830381865afa158015611686573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116aa919061251b565b949350505050565b6010546001600160a01b031633146116dc5760405162461bcd60e51b815260040161073390612449565b601354640100000000900460ff161561172d5760405162461bcd60e51b8152602060048201526013602482015272105b1c9958591e481a5b9a5d1a585b1a5e9959606a1b6044820152606401610733565b6000821161177d5760405162461bcd60e51b815260206004820152601860248201527f77726f6e6720636f6e747269627574696f6e206c696d697400000000000000006044820152606401610733565b818310156117c05760405162461bcd60e51b815260206004820152601060248201526f12185c9918d85c08115e18d95959195960821b6044820152606401610733565b8688106118055760405162461bcd60e51b815260206004820152601360248201527257726f6e67207369676e757020636f6e66696760681b6044820152606401610733565b8686116118545760405162461bcd60e51b815260206004820152601a60248201527f5374617274206665626f7265207369676e757020706572696f640000000000006044820152606401610733565b60068590556005839055600a8690556009879055600b8890556013805464ff00000000191664010000000017905560128290556014819055600c84905560408051428152602081018890529081018690527f2942eb7be804ba7efe93e5b8f2e1b0bcde0a25deae1aabcad7ddd8b307bff90d9060600160405180910390a15050505050505050565b6013546301000000900460ff16156119065760405162461bcd60e51b8152600401610733906123e2565b60135460ff16806119185750600a5442105b80611924575060065442115b6119685760405162461bcd60e51b815260206004820152601560248201527415da5d1a191c985ddcc81b9bdd08185b1b1bddd959605a1b6044820152606401610733565b61197433600f54611628565b6119b15760405162461bcd60e51b815260206004820152600e60248201526d4e6f20706174726f6e20726f6c6560901b6044820152606401610733565b80600081116119fa5760405162461bcd60e51b8152602060048201526015602482015274195c9c9bdc8e881dda5d1a191c985dc80c081155d5605a1b6044820152606401610733565b33600090815260208190526040902054611a4c5760405162461bcd60e51b81526020600482015260136024820152724e6f206465706f736974206174207374616b6560681b6044820152606401610733565b33600090815260208190526040902054811115611aab5760405162461bcd60e51b815260206004820152601760248201527f4e6f7420656e6f75676820455754206174207374616b650000000000000000006044820152606401610733565b600080611ab784611c9d565b915091508060086000828254611acd91906124cb565b90915550611add905033856120fa565b83600d6000828254611aef9190612504565b90915550503360009081526015602052604081208054869290611b13908490612504565b9091555050604051339083156108fc029084906000818181858888f19350505050158015611b45573d6000803e3d6000fd5b50604051428152829033907f92ccf450a286a957af52509bc1c9939d1a6a481783e142e41e2499f0bb66ebc69060200160405180910390a37f40ec41b547e3a769f863d660b593350eb4ce5d779b1c4e3f112eefc40c8e81d8338542604051611bb0939291906124e3565b60405180910390a150505050565b6010546001600160a01b03163314611be85760405162461bcd60e51b815260040161073390612449565b6013546301000000900460ff16611c375760405162461bcd60e51b815260206004820152601360248201527210dbdb9d1c9858dd081b9bdd0814185d5cd959606a1b6044820152606401610733565b6013805463ff00000019169055604080518181526010918101919091526f18dbdb9d1c9858dd155b9c185d5cd95960821b60608201524260208201527f5921431fa16f8be49d0a0175ba96d394094d37c61ef3ecd3985329c254cd108a90608001611569565b601354600090819060ff16158015611cb6575060075415155b8015611cc157508215155b15611cf5576000611cd384606461248a565b9050611ce16103e8826124a9565b9150611ced82856124cb565b925050915091565b91929050565b6001600160a01b038316611d5d5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610733565b6001600160a01b038216611dbe5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610733565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b038316611e835760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610733565b6001600160a01b038216611ee55760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610733565b6001600160a01b03831660009081526020819052604090205481811015611f5d5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610733565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290611f949084906124cb565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051611fe091815260200190565b60405180910390a350505050565b6001600160a01b0382166120445760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610733565b806002600082825461205691906124cb565b90915550506001600160a01b038216600090815260208190526040812080548392906120839084906124cb565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b604051339082156108fc029083906000818181858888f19350505050158015611337573d6000803e3d6000fd5b6001600160a01b03821661215a5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610733565b6001600160a01b038216600090815260208190526040902054818110156121ce5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610733565b6001600160a01b03831660009081526020819052604081208383039055600280548492906121fd908490612504565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b600060208083528351808285015260005b8181101561227557858101830151858201604001528201612259565b81811115612287576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b03811681146122b457600080fd5b919050565b600080604083850312156122cc57600080fd5b6122d58361229d565b946020939093013593505050565b6000806000606084860312156122f857600080fd5b6123018461229d565b925061230f6020850161229d565b9150604084013590509250925092565b60006020828403121561233157600080fd5b5035919050565b60006020828403121561234a57600080fd5b6123538261229d565b9392505050565b600080600080600080600080610100898b03121561237757600080fd5b505086359860208801359850604088013597606081013597506080810135965060a0810135955060c0810135945060e0013592509050565b600080604083850312156123c257600080fd5b6123cb8361229d565b91506123d96020840161229d565b90509250929050565b60208082526012908201527121b7b73a3930b1ba1034b990333937bd32b760711b604082015260600190565b600181811c9082168061242257607f821691505b6020821081141561244357634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526011908201527026bab9ba103132903a34329030b236b4b760791b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b60008160001904831182151516156124a4576124a4612474565b500290565b6000826124c657634e487b7160e01b600052601260045260246000fd5b500490565b600082198211156124de576124de612474565b500190565b6001600160a01b039390931683526020830191909152604082015260600190565b60008282101561251657612516612474565b500390565b60006020828403121561252d57600080fd5b8151801515811461235357600080fdfea2646970667358221220459676171226e60e83c86d643ec5716f0f5cf17917d3a768e79583c9fdb4b1de64736f6c634300080c0033";

export class Staking__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _claimManager: string,
    _rewardProvider: string,
    _serviceRole: BytesLike,
    _patronRole: BytesLike,
    tokenName: string,
    tokenSymbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Staking> {
    return super.deploy(
      _claimManager,
      _rewardProvider,
      _serviceRole,
      _patronRole,
      tokenName,
      tokenSymbol,
      overrides || {}
    ) as Promise<Staking>;
  }
  getDeployTransaction(
    _claimManager: string,
    _rewardProvider: string,
    _serviceRole: BytesLike,
    _patronRole: BytesLike,
    tokenName: string,
    tokenSymbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _claimManager,
      _rewardProvider,
      _serviceRole,
      _patronRole,
      tokenName,
      tokenSymbol,
      overrides || {}
    );
  }
  attach(address: string): Staking {
    return super.attach(address) as Staking;
  }
  connect(signer: Signer): Staking__factory {
    return super.connect(signer) as Staking__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakingInterface {
    return new utils.Interface(_abi) as StakingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Staking {
    return new Contract(address, _abi, signerOrProvider) as Staking;
  }
}
