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

    function getDeposit(address _staker) internal view returns(uint256 _deposit){
        require(isStaker[_staker], 'No deposit at stake');
        _deposit = stakes[_staker].deposit;
    }

    function removeStaker(address _staker) internal {
        require(isStaker[_staker], 'No deposit at stake');
        isStaker[_staker] = false;
        stakes[_staker].deposit = 0;

    }

    function withdraw(uint256 _deposit, address payable _recipient) internal {
        require(stakes[_recipient].deposit != 0, 'Nothing to withdraw');
        _recipient.transfer(_deposit);
        removeStaker(_recipient);
    }
}