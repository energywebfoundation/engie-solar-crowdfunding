// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './libs/IClaimManager.sol';

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Staking is ERC20Burnable {
    uint256 hardCap;
    uint256 endDate;
    uint256 rewards;
    uint256 signupEnd;
    uint256 startDate;
    uint256 totalStaked;
    bytes32 serviceRole;
    address private owner;
    uint256 contributionLimit;
    bool isContractInitialized;
    address claimManagerAddress;

    struct Stake {
        uint256 time;
        uint256 deposit;
    }

    mapping(address => Stake) stakes;
    
    event Funded(address _user, uint256 _amout, uint256 _timestamp);
    event Withdrawn(address _user, uint256 _amout, uint256 _timestamp);
    event StakingPoolInitialized(uint256 initDate, uint256 _startDate, uint256 _endDate);

    modifier initialized(){
        require(isContractInitialized, 'Not initialized');
        _;
    }

    modifier activated(){
        require(block.timestamp > startDate && block.timestamp < endDate, 'Contract not activated');
        _;
    }
   

    constructor(address _claimManager, bytes32 _serviceRole) ERC20("SOLAR TOKEN", "SLT") {
        owner = msg.sender;
        claimManagerAddress = _claimManager;
        serviceRole = _serviceRole;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Must be the admin");
        _;
    }

    modifier belowLimit(){
        require(msg.value + stakes[msg.sender].deposit <= contributionLimit, 'Contribution limit exceeded');
        _;
    }

    modifier sufficientBalance(uint256 amountToWithdraw){
        require(amountToWithdraw > 0, 'error: withdraw 0 EWT');
        require(stakes[msg.sender].deposit != 0, 'No deposit at stake');
        require(stakes[msg.sender].deposit >= amountToWithdraw, 'Not enough EWT at stake');
        _;
    }

    modifier withdrawsAllowed(){
        require(block.timestamp < startDate || block.timestamp > endDate, 'Withdraws not allowed');
        require(stakes[msg.sender].deposit != 0, 'No deposit at stake');
        _;
    }

    function sendRewards() payable external  activated {
        require(msg.value > 0, 'Not rewards provided');
        require(isServiceProvider(msg.sender, serviceRole), 'Not enrolled as service provider');
        //send reward
        rewards = msg.value;
    }

    function init(
        uint256 _signupStart,
        uint256 _signupEnd,
        uint256 _startDate,
        uint256 _endDate,
        uint256 _hardCap,
        uint256 _contributionLimit
    ) external onlyOwner {//To-Do: prevent resetting by owner

        require(_hardCap >= _contributionLimit, 'hardCap exceeded');
        require(_signupStart < _signupEnd, 'Wrong signup config');
        require(_startDate > _signupEnd, "Start febore signup period");
		endDate = _endDate;
        hardCap = _hardCap;
		startDate = _startDate;
        signupEnd = _signupEnd;
        isContractInitialized = true;
        contributionLimit = _contributionLimit;
		emit StakingPoolInitialized(block.timestamp, _startDate, _endDate);
    }

    function stake() payable initialized belowLimit external {
        require(msg.value > 0, 'No EWT provided');
        require(block.timestamp < signupEnd, "Staking contributions are no longer accepted");
        //Create or update deposit
        if (stakes[msg.sender].time == 0){
            stakes[msg.sender] = Stake(block.timestamp, msg.value);
        }
        else {
            stakes[msg.sender].time = block.timestamp;
            stakes[msg.sender].deposit += msg.value;
        }
        totalStaked += msg.value;
        _mint(msg.sender, msg.value);
    }

    function withdrawAll() withdrawsAllowed external {
        uint256 _deposit = stakes[msg.sender].deposit;
        withdraw(_deposit);
    }

    function withdraw(uint256 _amount)  withdrawsAllowed sufficientBalance(_amount) public {
        stakes[msg.sender].deposit -= _amount;
        burn(_amount);
        payable(msg.sender).transfer(_amount);
        emit Withdrawn(msg.sender, _amount, block.timestamp);
    }

    function isServiceProvider(address _provider, bytes32 _role) internal  view returns (bool){
		IClaimManager claimManager = IClaimManager(claimManagerAddress); // Contract deployed and maintained by EnergyWeb Fondation
        return (claimManager.hasRole(_provider, _role, 1));
    }
}