// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './StakingBase.sol';

contract Staking is StakingBase {
    uint256 endDate;
    uint256 startDate;
    uint256 totalStaked;
    address private owner;

    event StakingPoolInitialized(uint256 initDate, uint256 _startDate, uint256 _endDate);

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Must be the admin");
        _;
    }

    function canStake(address _user) internal view returns(bool isAllowed){
        require(
            isStaker[_user] == false && stakes[_user].deposit == 0,
            'Already staking'
        );
        //accepting contributions 2 weeks before start date
        uint256 contributionDate = startDate - 2 weeks;
        require(block.timestamp >= contributionDate, "Contributions not yet allowed");

        require(block.timestamp < startDate, "Staking contributions are no longer accepted");
        //To-Do: Check if ther user has the appropriate role in ClaimManager

        isAllowed = true;
    }
    function init(uint256 _startDate, uint256 _endDate) external onlyOwner {
        require(_startDate >= (block.timestamp + 2 weeks), "Start date should be at least 2 weeks ahead");
		startDate = _startDate;
		endDate = _endDate;

		emit StakingPoolInitialized(block.timestamp, _startDate, _endDate);
    }

    function stake() payable external {
        require(msg.value > 0, 'No EWT provided');
        require(canStake(msg.sender));
        saveDeposit(msg.value, msg.sender, block.timestamp);
        isStaker[msg.sender] = true;
        totalStaked += msg.value;
    }

}