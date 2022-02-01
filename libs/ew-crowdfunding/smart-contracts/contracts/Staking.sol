// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./libs/IClaimManager.sol";

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Staking is ERC20Burnable {
    uint256 public hardCap;
    uint256 public endDate;
    uint256 public rewards;
    uint256 public signupEnd;
    uint256 public startDate;
    uint256 public totalStaked;
    bytes32 public serviceRole;
    address private owner;
    uint256 public contributionLimit;
    bool private isContractInitialized;
    address public claimManagerAddress;

    struct Stake {
        uint256 time;
        uint256 deposit;
    }

    mapping(address => Stake) private stakes;
    
    event Funded(address _user, uint256 _amout, uint256 _timestamp);
    event RewardSent(address provider, uint256 amount, uint256 time);
    event Withdrawn(address _user, uint256 _amout, uint256 _timestamp);
    event StakingPoolInitialized(uint256 initDate, uint256 _startDate, uint256 _endDate);

    modifier initialized(){
        require(isContractInitialized, "Not initialized");
        _;
    }

    modifier activated(){
        require(block.timestamp > startDate && block.timestamp < endDate, "Contract not activated");
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
        require(msg.value + stakes[msg.sender].deposit <= contributionLimit, "Contribution limit exceeded");
        _;
    }

    modifier sufficientBalance(uint256 amountToWithdraw){
        require(amountToWithdraw > 0, "error: withdraw 0 EWT");
        require(balanceOf(msg.sender) != 0, "No deposit at stake");
        require(balanceOf(msg.sender) >= amountToWithdraw, "Not enough EWT at stake");
        _;
    }

    modifier withdrawsAllowed(){
        require(block.timestamp < startDate || block.timestamp > endDate, "Withdraws not allowed");
        require(balanceOf(msg.sender) != 0, "No deposit at stake");
        _;
    }

    function sendRewards() external payable activated {
        require(msg.value > 0, "Not rewards provided");
        require(isServiceProvider(msg.sender, serviceRole), "Not enrolled as service provider");
        //send reward
        rewards += msg.value;
        emit RewardSent(msg.sender, msg.value, block.timestamp);
    }

    function init(
        uint256 _signupStart,
        uint256 _signupEnd,
        uint256 _startDate,
        uint256 _endDate,
        uint256 _hardCap,
        uint256 _contributionLimit
    ) external onlyOwner {//To-Do: prevent resetting by owner

        require(_hardCap >= _contributionLimit, "hardCap exceeded");
        require(_signupStart < _signupEnd, "Wrong signup config");
        require(_startDate > _signupEnd, "Start febore signup period");
		endDate = _endDate;
        hardCap = _hardCap;
		startDate = _startDate;
        signupEnd = _signupEnd;
        isContractInitialized = true;
        contributionLimit = _contributionLimit;
		emit StakingPoolInitialized(block.timestamp, _startDate, _endDate);
    }

    function stake() external payable initialized belowLimit {
        require(msg.value > 0, "No EWT provided");
        require(block.timestamp < signupEnd, "Signup Ended");
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

    function withdrawAll() external withdrawsAllowed {
        withdraw(balanceOf(msg.sender));
    }

    function withdraw(uint256 _amount) public withdrawsAllowed sufficientBalance(_amount) {
        uint256 toWithdraw = _getRewards(_amount); 
        burn(_amount);
        payable(msg.sender).transfer(toWithdraw);
        emit Withdrawn(msg.sender, toWithdraw, block.timestamp);
    }

    function isServiceProvider(address _provider, bytes32 _role) internal view returns (bool){
		IClaimManager claimManager = IClaimManager(claimManagerAddress); // Contract deployed and maintained by EnergyWeb Fondation
        return (claimManager.hasRole(_provider, _role, 1));
    }

    function _getRewards(uint256 _amount) internal sufficientBalance(_amount) view returns(uint256 reward){
        // R=balanceOf(SLT)+(balanceOf(SLT) * REWARDS / HARCAP)
        uint256 interests = _amount * (rewards / hardCap);
        reward = _amount + interests; 
    }

    function getRewards() external view returns (uint256){
        return _getRewards(balanceOf(msg.sender));
    }
}