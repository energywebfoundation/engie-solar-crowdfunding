// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library LibStaking {
    bytes32 constant STAKING_STORAGE_POSITION = keccak256("energyweb.proxy.standard.staking.storage");

    struct Stake {
        uint256 id;
        uint256 time;
        uint256 deposit;
    }

    struct StakingStorage {
        uint256 endDate;
        uint256 startDate;
        uint256 stakerCount;
        uint256 totalStaked;
        uint256 futureRewards;
        uint256 contributionLimit;

        bytes32[] patronRoles;
        
        //Addresses
        address claimManager;

       mapping(address => Stake) stakes;
       mapping(address => bool) isStaker;
    }

    function stakingStorage() internal pure returns (StakingStorage storage stakingPointer){
        bytes32 position = STAKING_STORAGE_POSITION;
        assembly {
            stakingPointer.slot :=  position
        }
    }
}