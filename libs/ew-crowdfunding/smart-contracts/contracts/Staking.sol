// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './StakingBase.sol';

contract Staking is StakingBase {
    uint256 hardCap;
    uint256 endDate;
    uint256 startDate;
    uint256 totalStaked;
    address private owner;
    uint256 contributionLimit;
    bool isContractInitialized;

    event Funded(address _user, uint256 _amout, uint256 _timestamp);
    event Withdrawn(address _user, uint256 _amout, uint256 _timestamp);
    event StakingPoolInitialized(uint256 initDate, uint256 _startDate, uint256 _endDate);

    modifier initialized(){
        require(isContractInitialized, 'Not initialized');
        _;
    }

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Must be the admin");
        _;
    }

    modifier belowLimit(){
        require(msg.value <= contributionLimit, 'Stake greater than contribution limit');
        _;
    }

    function canStake(address _user) internal view returns(bool isAllowed){
        require(
            isStaker[_user] == false && stakes[_user].deposit == 0,
            'Already staking'
        );
        //accepting contributions 2 weeks before start date
        uint256 contributionDate = startDate - 2 weeks;
        require(block.timestamp + 10 seconds >= contributionDate, "Contributions not yet allowed");

        require(block.timestamp < startDate, "Staking contributions are no longer accepted");
        //To-Do: Check if ther user has the appropriate role in ClaimManager

        isAllowed = true;
    }
    function init(
        uint256 _signupStart,
        uint256 _signupEnd,
        uint256 _startDate,
        uint256 _endDate,
        uint256 _hardCap,
        uint256 _contributionLimit
    ) external onlyOwner {

        require(_hardCap >= _contributionLimit, 'hardCap exceeded');
        require(_signupStart < _signupEnd, 'Wrong signup config');
        require(_startDate > _signupEnd, "Start febore signup period");
		endDate = _endDate;
        hardCap = _hardCap;
		startDate = _startDate;
        isContractInitialized = true;
        contributionLimit = _contributionLimit;
		emit StakingPoolInitialized(block.timestamp, _startDate, _endDate);
    }

    function stake() payable initialized belowLimit external {
        require(msg.value > 0, 'No EWT provided');
        require(canStake(msg.sender));
        saveDeposit(msg.value, msg.sender, block.timestamp);
        isStaker[msg.sender] = true;
        totalStaked += msg.value;
    }

    function unstake() external {
        uint256 _deposit = getDeposit((msg.sender));
        payable(msg.sender).transfer(_deposit);
        removeStaker((msg.sender));
        emit Withdrawn(msg.sender, _deposit, block.timestamp);
    }
}