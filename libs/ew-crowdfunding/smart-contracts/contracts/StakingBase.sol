// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StakingBase {

    struct Stake {
        uint256 time;
        uint256 deposit;
    }

    mapping(address => Stake) stakes;
    mapping(address => bool) isStaker;

    function saveDeposit(uint256 _deposit, address _user, uint256 _timeStamp) internal {
        Stake memory userStake = Stake(_timeStamp, _deposit);
        stakes[_user] = userStake;
    }

    function removeStaker(address _staker) internal {
        require(stakes[_staker].deposit != 0, 'No deposit at stake');
        stakes[_staker].deposit = 0;
    }
}