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
    bytes32 public serviceRole;
    bytes32 public patronRole;
    address private owner;
    address private rewardProvider;
    uint256 public contributionLimit;
    bool private aborted;
    bool private isContractPaused;
    bool private isContractInitialized;
    address public claimManagerAddress;

    struct Stake {
        uint256 time;
        uint256 deposit;
    }

    mapping(address => Stake) private stakes;
    
    event CampaignAborted(uint256 _timestamp);
    event StatusChanged(string statusType, uint256 date);
    event Funded(address _user, uint256 _amout, uint256 _timestamp);
    event RewardSent(address provider, uint256 amount, uint256 time);
    event Withdrawn(address _user, uint256 _amout, uint256 _timestamp);
    event TokenBurnt(address _user, uint256 _amout, uint256 _timestamp);
    event RefundExceeded(address _sender, uint256 amount, uint256 refunded);
    event StakingPoolInitialized(uint256 initDate, uint256 _startDate, uint256 _endDate);

    modifier initialized(){
        require(isContractInitialized, "Not initialized");
        _;
    }

    modifier activated(){
        require(block.timestamp > startDate && block.timestamp < endDate, "Contract not activated");
        _;
    }
   
    constructor(address _claimManager, bytes32 _serviceRole, bytes32 _patronRole, string memory tokenName, string memory tokenSymbol) ERC20(tokenName, tokenSymbol) {
        owner = msg.sender;
        claimManagerAddress = _claimManager;
        serviceRole = _serviceRole;
        patronRole = _patronRole;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Must be the admin");
        _;
    }

     modifier paused(){
        require(isContractPaused, "Contract not Paused");
        _;
    }

    modifier notPaused(){
        require(!isContractPaused, "Contract is frozen");
        _;
    }

    modifier belowLimit(){
        require(msg.value > 0, "No EWT provided");
        require(block.timestamp < signupEnd, "Signup Ended");
        require(stakes[msg.sender].deposit < contributionLimit, "Contribution limit reached"); //prevent reentrency
        _;
    }

    modifier sufficientBalance(uint256 amountToWithdraw){
        require(amountToWithdraw > 0, "error: withdraw 0 EWT");
        require(balanceOf(msg.sender) != 0, "No deposit at stake");
        require(balanceOf(msg.sender) >= amountToWithdraw, "Not enough EWT at stake");
        _;
    }

    modifier withdrawsAllowed(){
        require(aborted || block.timestamp < startDate || block.timestamp > endDate, "Withdraws not allowed");
        require(hasRole(msg.sender, patronRole), "No patron role");
        _;
    }

    modifier notAborted(){
        require(!aborted, "Campaign aborted");
        _;
    }

    function depositRewards() external payable notAborted activated {
        require(msg.value > 0, "Not rewards provided");
        require(hasRole(msg.sender, serviceRole) || (msg.sender == owner), "Not enrolled as service provider");
        rewards += msg.value;
        rewardProvider = msg.sender;
        emit RewardSent(msg.sender, msg.value, block.timestamp);
    }

    function burn(uint256 _amount) public override {
        redeem(_amount);
    }

    function init(
        uint256 _signupStart,
        uint256 _signupEnd,
        uint256 _startDate,
        uint256 _endDate,
        uint256 _hardCap,
        uint256 _contributionLimit
    ) external onlyOwner {
        require(!isContractInitialized, "Already initialized");//Preventing resetting by owner
        require(_contributionLimit > 0, "wrong contribution limit");
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

    function pause() external notAborted onlyOwner notPaused {
        isContractPaused = true;
        emit StatusChanged("contractPaused", block.timestamp);
    }

     function unPause() public onlyOwner paused {
        isContractPaused = false;
        emit StatusChanged("contractUnpaused", block.timestamp);
    }

    function deleteParameters() internal {
		delete endDate;
		delete hardCap;
        delete startDate;
        delete signupEnd;
        delete isContractPaused;
		delete contributionLimit;
        delete claimManagerAddress;
    }

    function terminate() external onlyOwner {
        require(aborted == false , "Already terminated");
		uint256 payout = rewards;
        if (payout != 0){
		    payable(rewardProvider).transfer(payout);
        }
        deleteParameters();
        aborted = true;
        emit CampaignAborted(block.timestamp);
    }

    function stake() external payable initialized belowLimit notPaused {
        require(hasRole(msg.sender, patronRole), "No patron role");
        if (stakes[msg.sender].deposit + msg.value > contributionLimit){
            uint256 overflow = msg.value - (contributionLimit - stakes[msg.sender].deposit);
            stakes[msg.sender].deposit = contributionLimit;
            _mint(msg.sender, msg.value - overflow); // mint the effective amount deposited
            payable(msg.sender).transfer(overflow);
            emit RefundExceeded(msg.sender, msg.value, overflow);
        } else {
            stakes[msg.sender].deposit += msg.value;
            _mint(msg.sender, msg.value);
        }
        stakes[msg.sender].time = block.timestamp;
    }

    function redeemAll() external notPaused {
        redeem(balanceOf(msg.sender));
    }
    
    function redeem(uint256 _amount) public notPaused withdrawsAllowed sufficientBalance(_amount) {
        uint256 toWithdraw = _getRewards(_amount);
        // burn(_amount);
        _burn(_msgSender(), _amount);
        payable(msg.sender).transfer(toWithdraw);
        emit Withdrawn(msg.sender, toWithdraw, block.timestamp);
        emit TokenBurnt(msg.sender, _amount, block.timestamp);
    }

    function hasRole(address _provider, bytes32 _role) public view returns (bool){
		IClaimManager claimManager = IClaimManager(claimManagerAddress); // Contract deployed and maintained by EnergyWeb Fondation
        return (claimManager.hasRole(_provider, _role, 1));
    }

    function _getRewards(uint256 _amount) internal sufficientBalance(_amount) view returns(uint256 reward){
        uint256 interests = _amount * (rewards / hardCap);
        reward = _amount + interests;
    }

    function getRewards() external notPaused view returns (uint256){
        return _getRewards(balanceOf(msg.sender));
    }
}