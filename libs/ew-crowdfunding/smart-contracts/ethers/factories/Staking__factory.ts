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
  "0x60806040523480156200001157600080fd5b50604051620028fd380380620028fd83398101604081905262000034916200025e565b8151829082906200004d906003906020850190620000ce565b50805162000063906004906020840190620000ce565b50506005805462010000600160b01b031990811633620100009081029190911790925560138054610100600160a81b0319166101006001600160a01b039b8c1602179055600d96909655600a949094555050601080549093169390941602919091179055506200033e565b828054620000dc9062000301565b90600052602060002090601f0160209004810192826200010057600085556200014b565b82601f106200011b57805160ff19168380011785556200014b565b828001600101855582156200014b579182015b828111156200014b5782518255916020019190600101906200012e565b50620001599291506200015d565b5090565b5b808211156200015957600081556001016200015e565b80516001600160a01b03811681146200018c57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620001b957600080fd5b81516001600160401b0380821115620001d657620001d662000191565b604051601f8301601f19908116603f0116810190828211818310171562000201576200020162000191565b816040528381526020925086838588010111156200021e57600080fd5b600091505b8382101562000242578582018301518183018401529082019062000223565b83821115620002545760008385830101525b9695505050505050565b60008060008060008060c087890312156200027857600080fd5b620002838762000174565b9550620002936020880162000174565b6040880151606089015160808a015192975090955093506001600160401b0380821115620002c057600080fd5b620002ce8a838b01620001a7565b935060a0890151915080821115620002e557600080fd5b50620002f489828a01620001a7565b9150509295509295509295565b600181811c908216806200031657607f821691505b602082108114156200033857634e487b7160e01b600052602260045260246000fd5b50919050565b6125af806200034e6000396000f3fe6080604052600436106102455760003560e01c80637332e07711610139578063c032846b116100b6578063db006a751161007a578063db006a7514610640578063dd2f35e914610660578063dd62ed3e14610676578063eb013933146106bc578063f7b188a5146106d6578063fb86a404146106eb57600080fd5b8063c032846b14610589578063c11aae8c146105d2578063c24a0f8b146105f2578063c399ec8814610608578063ce45ed261461062a57600080fd5b806395d89b41116100fd57806395d89b41146104fe578063a457c2d714610513578063a9059cbb14610533578063ac4ab3fb14610553578063af63dda41461057357600080fd5b80637332e0771461048757806379cc67901461049d5780637c0e77ac146104bd578063817b1cd2146104d35780638456cb59146104e957600080fd5b806323b872dd116101c7578063395093511161018b57806339509351146103f35780633a4b66f11461041357806342966c681461041b5780634a3642a51461043b57806370a082311461045157600080fd5b806323b872dd146103775780632f4350c214610397578063313ce567146103ac57806335faa416146103c8578063386db479146103dd57600080fd5b80630c08bf881161020e5780630c08bf88146103175780630e15561a1461032e578063152111f71461034457806318160ddd1461034c5780631aeae7ba1461036157600080fd5b806216ee161461024a5780630572b0cc1461028c57806306fdde03146102af578063095ea7b3146102d15780630b97bc8614610301575b600080fd5b34801561025657600080fd5b5060135461026f9061010090046001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561029857600080fd5b506102a1610701565b604051908152602001610283565b3480156102bb57600080fd5b506102c4610723565b6040516102839190612284565b3480156102dd57600080fd5b506102f16102ec3660046122f5565b6107b5565b6040519015158152602001610283565b34801561030d57600080fd5b506102a160095481565b34801561032357600080fd5b5061032c6107cb565b005b34801561033a57600080fd5b506102a1600e5481565b61032c6109ae565b34801561035857600080fd5b506002546102a1565b34801561036d57600080fd5b506102a1600d5481565b34801561038357600080fd5b506102f161039236600461231f565b610c16565b3480156103a357600080fd5b5061032c610cc0565b3480156103b857600080fd5b5060405160128152602001610283565b3480156103d457600080fd5b5061032c610d03565b3480156103e957600080fd5b506102a160125481565b3480156103ff57600080fd5b506102f161040e3660046122f5565b610e9b565b61032c610ed7565b34801561042757600080fd5b5061032c61043636600461235b565b611462565b34801561044757600080fd5b506102a160085481565b34801561045d57600080fd5b506102a161046c366004612374565b6001600160a01b031660009081526020819052604090205490565b34801561049357600080fd5b506102a160115481565b3480156104a957600080fd5b5061032c6104b83660046122f5565b61146e565b3480156104c957600080fd5b506102a160145481565b3480156104df57600080fd5b506102a1600c5481565b3480156104f557600080fd5b5061032c6114f4565b34801561050a57600080fd5b506102c46115b8565b34801561051f57600080fd5b506102f161052e3660046122f5565b6115c7565b34801561053f57600080fd5b506102f161054e3660046122f5565b611660565b34801561055f57600080fd5b506102f161056e3660046122f5565b61166d565b34801561057f57600080fd5b506102a1600b5481565b34801561059557600080fd5b5060135460105460055460ff9283169261010092839004811692909104166040805193151584529115156020840152151590820152606001610283565b3480156105de57600080fd5b5061032c6105ed366004612396565b6116f3565b3480156105fe57600080fd5b506102a160075481565b34801561061457600080fd5b50336000908152601560205260409020546102a1565b34801561063657600080fd5b506102a1600f5481565b34801561064c57600080fd5b5061032c61065b36600461235b565b611913565b34801561066c57600080fd5b506102a1600a5481565b34801561068257600080fd5b506102a16106913660046123eb565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b3480156106c857600080fd5b506005546102f19060ff1681565b3480156106e257600080fd5b5061032c611bf8565b3480156106f757600080fd5b506102a160065481565b33600090815260208190526040812054819061071c90611cd7565b5092915050565b6060600380546107329061241e565b80601f016020809104026020016040519081016040528092919081815260200182805461075e9061241e565b80156107ab5780601f10610780576101008083540402835291602001916107ab565b820191906000526020600020905b81548152906001019060200180831161078e57829003601f168201915b5050505050905090565b60006107c2338484611d37565b50600192915050565b6005546201000090046001600160a01b031633146108045760405162461bcd60e51b81526004016107fb90612459565b60405180910390fd5b600554610100900460ff16156108515760405162461bcd60e51b8152602060048201526012602482015271105b1c9958591e481d195c9b5a5b985d195960721b60448201526064016107fb565b6007544211156108a35760405162461bcd60e51b815260206004820152601f60248201527f4572726f723a2063616e63656c696e672061667465722063616d706169676e0060448201526064016107fb565b600e546005805461ff0019166101001790556108d9600060068190556008819055600e8190556010805461ff0019169055601155565b801561092057601054604051620100009091046001600160a01b0316906108fc8315029083906000818181858888f1935050505015801561091e573d6000803e3d6000fd5b505b60408051818152600f818301526e18d85b5c185a59db90589bdc9d1959608a1b606082015242602082015290517f5921431fa16f8be49d0a0175ba96d394094d37c61ef3ecd3985329c254cd108a9181900360800190a16040514281527f396ef65364c652a5186a005bb7dcf6aac4d2adcb6c6d0adf39a5f13104a2e344906020015b60405180910390a150565b6000600c5460786109bf919061249a565b90506109cd6103e8826124b9565b600c546109da91906124db565b341015610a1e5760405162461bcd60e51b81526020600482015260126024820152714e6f7420456e6f756768207265776172647360701b60448201526064016107fb565b600554610100900460ff1615610a695760405162461bcd60e51b815260206004820152601060248201526f10d85b5c185a59db8818589bdc9d195960821b60448201526064016107fb565b6009544210158015610a7c575060075442105b610ac15760405162461bcd60e51b815260206004820152601660248201527510dbdb9d1c9858dd081b9bdd081858dd1a5d985d195960521b60448201526064016107fb565b60105460ff1615610b055760405162461bcd60e51b815260206004820152600e60248201526d105b1c9958591e48199d5b99195960921b60448201526064016107fb565b60003411610b4b5760405162461bcd60e51b8152602060048201526013602482015272139bc81c995dd85c991cc81c1c9bdd9a591959606a1b60448201526064016107fb565b610b5733600d5461166d565b80610b7257506010546201000090046001600160a01b031633145b610bbe5760405162461bcd60e51b815260206004820181905260248201527f4e6f7420656e726f6c6c656420617320736572766963652070726f766964657260448201526064016107fb565b34600e6000828254610bd091906124db565b90915550506010805460ff191660011790556040517f6379339f0ae63e95e65fad18ca2a7ec4e7e3f05f3cc5f7079f4d8da8cec34faa906109a3903390349042906124f3565b6000610c23848484611e5b565b6001600160a01b038416600090815260016020908152604080832033845290915290205482811015610ca85760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084016107fb565b610cb58533858403611d37565b506001949350505050565b601054610100900460ff1615610ce85760405162461bcd60e51b81526004016107fb90612514565b33600090815260208190526040902054610d0190611913565b565b610d0f33600d5461166d565b80610d2a57506010546201000090046001600160a01b031633145b610d6d5760405162461bcd60e51b815260206004820152601460248201527304e6f7420616c6c6f77656420746f2073776565760641b60448201526064016107fb565b60055460ff1615610db25760405162461bcd60e51b815260206004820152600f60248201526e105b1c9958591e481cddd9595c1959608a1b60448201526064016107fb565b600f54421015610e045760405162461bcd60e51b815260206004820152601a60248201527f43616e6e6f74207377656570206265666f72652065787069727900000000000060448201526064016107fb565b6000601254600c54610e169190612540565b6005805460ff191660011790556010546040519192506001600160a01b0362010000909104169082156108fc029083906000818181858888f19350505050158015610e65573d6000803e3d6000fd5b50604080518281524260208201527f8ca6abf6b1c0bd37b098133cb9c8a94eb36b3f0f859bbca87c56b032880f5b3591016109a3565b3360008181526001602090815260408083206001600160a01b038716845290915281205490916107c2918590610ed29086906124db565b611d37565b600554610100900460ff1615610f225760405162461bcd60e51b815260206004820152601060248201526f10d85b5c185a59db8818589bdc9d195960821b60448201526064016107fb565b60135460ff16610f665760405162461bcd60e51b815260206004820152600f60248201526e139bdd081a5b9a5d1a585b1a5e9959608a1b60448201526064016107fb565b60003411610fa85760405162461bcd60e51b815260206004820152600f60248201526e139bc81155d5081c1c9bdd9a591959608a1b60448201526064016107fb565b6008544210610fe85760405162461bcd60e51b815260206004820152600c60248201526b14da59db9d5c08115b99195960a21b60448201526064016107fb565b600654600c541061102e5760405162461bcd60e51b815260206004820152601060248201526f12185c9918d85c08115e18d95959195960821b60448201526064016107fb565b601154336000908152601560205260409020541061108e5760405162461bcd60e51b815260206004820152601a60248201527f436f6e747269627574696f6e206c696d6974207265616368656400000000000060448201526064016107fb565b601054610100900460ff16156110b65760405162461bcd60e51b81526004016107fb90612514565b6014543410156110f75760405162461bcd60e51b815260206004820152600c60248201526b56616c756520746f206c6f7760a01b60448201526064016107fb565b61110333600a5461166d565b6111405760405162461bcd60e51b815260206004820152600e60248201526d4e6f20706174726f6e20726f6c6560901b60448201526064016107fb565b6011543360009081526015602052604090205461115e9034906124db565b1061138057336000908152601560205260408120546011546111809190612540565b61118a9034612540565b905060006111988234612540565b905060065481600c546111ab91906124db565b11156112ba576000600c546006546111c39190612540565b6111cd9083612540565b905060006111db8284612540565b336000908152601560205260408120805492935083929091906111ff9084906124db565b9091555061120f9050338261202a565b604051428152819033907f55595f34fd936311e65eca0a752ee70068b8992fdf64918aff1b6345689c84e49060200160405180910390a37fef3402545c3e64e30583a48b60392700e20c20e1e2406dce9d340c9b54c476fc333461127385886124db565b604051611282939291906124f3565b60405180910390a180600c600082825461129c91906124db565b909155506112b490506112af83866124db565b612109565b50505050565b33600090815260156020526040812080548392906112d99084906124db565b909155506112e99050338261202a565b604051428152819033907f55595f34fd936311e65eca0a752ee70068b8992fdf64918aff1b6345689c84e49060200160405180910390a37fef3402545c3e64e30583a48b60392700e20c20e1e2406dce9d340c9b54c476fc333484604051611353939291906124f3565b60405180910390a180600c600082825461136d91906124db565b9091555061137c905082612109565b5050565b60065434600c5461139191906124db565b106113e4576000600c546006546113a89190612540565b6113b29034612540565b905060006113c08234612540565b336000908152601560205260408120805492935083929091906112d99084906124db565b33600090815260156020526040812080543492906114039084906124db565b9091555050604051428152349033907f55595f34fd936311e65eca0a752ee70068b8992fdf64918aff1b6345689c84e49060200160405180910390a3611449333461202a565b34600c600082825461145b91906124db565b9091555050565b61146b81611913565b50565b600061147a8333610691565b9050818110156114d85760405162461bcd60e51b8152602060048201526024808201527f45524332303a206275726e20616d6f756e74206578636565647320616c6c6f77604482015263616e636560e01b60648201526084016107fb565b6114e58333848403611d37565b6114ef8383612136565b505050565b6005546201000090046001600160a01b031633146115245760405162461bcd60e51b81526004016107fb90612459565b601054610100900460ff161561154c5760405162461bcd60e51b81526004016107fb90612514565b6010805461ff00191661010017905560408051818152600e918101919091526d18dbdb9d1c9858dd14185d5cd95960921b60608201524260208201527f5921431fa16f8be49d0a0175ba96d394094d37c61ef3ecd3985329c254cd108a906080015b60405180910390a1565b6060600480546107329061241e565b3360009081526001602090815260408083206001600160a01b0386168452909152812054828110156116495760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016107fb565b6116563385858403611d37565b5060019392505050565b60006107c2338484611e5b565b601354604051634aefbd8f60e11b815260009161010090046001600160a01b03169081906395df7b1e906116aa90879087906001906004016124f3565b602060405180830381865afa1580156116c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116eb9190612557565b949350505050565b6005546201000090046001600160a01b031633146117235760405162461bcd60e51b81526004016107fb90612459565b60135460ff161561176c5760405162461bcd60e51b8152602060048201526013602482015272105b1c9958591e481a5b9a5d1a585b1a5e9959606a1b60448201526064016107fb565b600082116117bc5760405162461bcd60e51b815260206004820152601860248201527f77726f6e6720636f6e747269627574696f6e206c696d6974000000000000000060448201526064016107fb565b818310156117ff5760405162461bcd60e51b815260206004820152601060248201526f12185c9918d85c08115e18d95959195960821b60448201526064016107fb565b8688106118445760405162461bcd60e51b815260206004820152601360248201527257726f6e67207369676e757020636f6e66696760681b60448201526064016107fb565b8686116118935760405162461bcd60e51b815260206004820152601a60248201527f5374617274206665626f7265207369676e757020706572696f6400000000000060448201526064016107fb565b6007859055600683905560098690556008879055600b8890556013805460ff1916600117905560118290556014819055600f84905560408051428152602081018890529081018690527f2942eb7be804ba7efe93e5b8f2e1b0bcde0a25deae1aabcad7ddd8b307bff90d9060600160405180910390a15050505050505050565b601054610100900460ff161561193b5760405162461bcd60e51b81526004016107fb90612514565b600554610100900460ff1680611952575060095442105b8061195e575060075442115b6119a25760405162461bcd60e51b815260206004820152601560248201527415da5d1a191c985ddcc81b9bdd08185b1b1bddd959605a1b60448201526064016107fb565b6119ae33600a5461166d565b6119eb5760405162461bcd60e51b815260206004820152600e60248201526d4e6f20706174726f6e20726f6c6560901b60448201526064016107fb565b8060008111611a345760405162461bcd60e51b8152602060048201526015602482015274195c9c9bdc8e881dda5d1a191c985dc80c081155d5605a1b60448201526064016107fb565b33600090815260208190526040902054611a865760405162461bcd60e51b81526020600482015260136024820152724e6f206465706f736974206174207374616b6560681b60448201526064016107fb565b33600090815260208190526040902054811115611ae55760405162461bcd60e51b815260206004820152601760248201527f4e6f7420656e6f75676820455754206174207374616b6500000000000000000060448201526064016107fb565b600080611af184611cd7565b915091508060126000828254611b0791906124db565b90915550611b1790503385612136565b83600c6000828254611b299190612540565b90915550503360009081526015602052604081208054869290611b4d908490612540565b9091555050604051339083156108fc029084906000818181858888f19350505050158015611b7f573d6000803e3d6000fd5b50604051428152829033907f92ccf450a286a957af52509bc1c9939d1a6a481783e142e41e2499f0bb66ebc69060200160405180910390a37f40ec41b547e3a769f863d660b593350eb4ce5d779b1c4e3f112eefc40c8e81d8338542604051611bea939291906124f3565b60405180910390a150505050565b6005546201000090046001600160a01b03163314611c285760405162461bcd60e51b81526004016107fb90612459565b601054610100900460ff16611c755760405162461bcd60e51b815260206004820152601360248201527210dbdb9d1c9858dd081b9bdd0814185d5cd959606a1b60448201526064016107fb565b6010805461ff001916815560408051818152908101919091526f18dbdb9d1c9858dd155b9c185d5cd95960821b60608201524260208201527f5921431fa16f8be49d0a0175ba96d394094d37c61ef3ecd3985329c254cd108a906080016115ae565b6005546000908190610100900460ff16158015611cf55750600e5415155b8015611d0057508215155b15611d2e57611d10600a846124b9565b611d1a90846124db565b611d25600a856124b9565b91509150915091565b50909160009150565b6001600160a01b038316611d995760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016107fb565b6001600160a01b038216611dfa5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016107fb565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b038316611ebf5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016107fb565b6001600160a01b038216611f215760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016107fb565b6001600160a01b03831660009081526020819052604090205481811015611f995760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016107fb565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290611fd09084906124db565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161201c91815260200190565b60405180910390a350505050565b6001600160a01b0382166120805760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016107fb565b806002600082825461209291906124db565b90915550506001600160a01b038216600090815260208190526040812080548392906120bf9084906124db565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b604051339082156108fc029083906000818181858888f1935050505015801561137c573d6000803e3d6000fd5b6001600160a01b0382166121965760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016107fb565b6001600160a01b0382166000908152602081905260409020548181101561220a5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016107fb565b6001600160a01b0383166000908152602081905260408120838303905560028054849290612239908490612540565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b600060208083528351808285015260005b818110156122b157858101830151858201604001528201612295565b818111156122c3576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b03811681146122f057600080fd5b919050565b6000806040838503121561230857600080fd5b612311836122d9565b946020939093013593505050565b60008060006060848603121561233457600080fd5b61233d846122d9565b925061234b602085016122d9565b9150604084013590509250925092565b60006020828403121561236d57600080fd5b5035919050565b60006020828403121561238657600080fd5b61238f826122d9565b9392505050565b600080600080600080600080610100898b0312156123b357600080fd5b505086359860208801359850604088013597606081013597506080810135965060a0810135955060c0810135945060e0013592509050565b600080604083850312156123fe57600080fd5b612407836122d9565b9150612415602084016122d9565b90509250929050565b600181811c9082168061243257607f821691505b6020821081141561245357634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526011908201527026bab9ba103132903a34329030b236b4b760791b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b60008160001904831182151516156124b4576124b4612484565b500290565b6000826124d657634e487b7160e01b600052601260045260246000fd5b500490565b600082198211156124ee576124ee612484565b500190565b6001600160a01b039390931683526020830191909152604082015260600190565b60208082526012908201527121b7b73a3930b1ba1034b990333937bd32b760711b604082015260600190565b60008282101561255257612552612484565b500390565b60006020828403121561256957600080fd5b8151801515811461238f57600080fdfea26469706673582212202f09825a28e5873f596f7f6716dadcde8208407108a12444c74a33b0aaed9a2a64736f6c634300080c0033";

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
