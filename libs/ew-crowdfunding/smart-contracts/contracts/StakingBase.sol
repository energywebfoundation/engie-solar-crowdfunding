// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StakingBase {

    struct Stake {
        uint256 time;
        uint256 deposit;
    }

    mapping(address => Stake) stakes;

    function saveDeposit(uint256 _deposit, address _user, uint256 _timeStamp) internal {
        //Creates stakes if doesn't exists otherwise, updates it
        if (stakes[_user].time == 0){
            Stake memory userStake = Stake(_timeStamp, _deposit);
            stakes[_user] = userStake;
        } else {
            stakes[_user].deposit += _deposit;
            stakes[_user].time = block.timestamp;
        }
    }
}