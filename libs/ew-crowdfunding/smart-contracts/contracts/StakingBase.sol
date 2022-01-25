// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StakingBase {
    uint256 stakerCount;

    struct Stake {
        uint256 id;
        uint256 time;
        uint256 deposit;
    }

    mapping(address => Stake) stakes;
    mapping(address => bool) isStaker;

    function saveDeposit(uint256 _deposit, address _user, uint256 _timeStamp) internal {
        uint256 id = stakerCount + 1;
        Stake memory userStake = Stake(id, _timeStamp, _deposit);
        stakes[_user] = userStake;
        stakerCount = id;
    }

    function removeStaker(address _staker) internal {
        require(stakes[_staker].deposit != 0, 'No deposit at stake');
        stakes[_staker].deposit = 0;
    }
}