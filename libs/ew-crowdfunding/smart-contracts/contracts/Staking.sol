// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;
import "./interfaces/IClaimManager.sol";

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Staking is ERC20Burnable {
    bool public sweeped;
    bool private aborted;
    address private owner;
    uint256 public hardCap;
    uint256 public endDate;
    uint256 public signupEnd;
    uint256 public startDate;
    bytes32 public patronRole;
    uint256 public signupStart;
    uint256 public totalStaked;
    bytes32 public serviceRole;
    uint256 public totalRewards;
    uint256 public fullStopDate;
    bool private contractFunded;
    bool private isContractPaused;
    address private rewardProvider;
    uint256 public contributionLimit;
    uint256 public allRedeemedRewards;
    bool private isContractInitialized;
    address public claimManagerAddress;
    uint256 public minRequiredStake;

    mapping(address => uint256) private stakes;
    
    event CampaignAborted(uint256 _timestamp);
    event StatusChanged(string statusType, uint256 date);
    event NewStake(address indexed _user, uint256 indexed _amout, uint256 _timestamp);
    event RewardSent(address provider, uint256 amount, uint256 time);
    event Withdrawn(address indexed _user, uint256 indexed _amout, uint256 _timestamp);
    event TokenBurnt(address _user, uint256 _amout, uint256 _timestamp);
    event RefundExceeded(address _sender, uint256 amount, uint256 refunded);
    event StakingPoolInitialized(uint256 initDate, uint256 _startDate, uint256 _endDate);
    event Swept(uint256 _amount, uint256 _date);

    modifier initialized(){
        require(isContractInitialized, "Not initialized");
        _;
    }

    modifier activated(){
        require(block.timestamp >= startDate && block.timestamp < endDate, "Contract not activated");
        _;
    }
   
    constructor(
        address _claimManager,
        address _rewardProvider,
        bytes32 _serviceRole,
        bytes32 _patronRole,
        string memory tokenName,
        string memory tokenSymbol
    ) ERC20(tokenName, tokenSymbol) {
        owner = msg.sender;
        claimManagerAddress = _claimManager;
        serviceRole = _serviceRole;
        patronRole = _patronRole;
        rewardProvider = _rewardProvider;
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
        require(totalStaked < hardCap, "Hardcap Exceeded");
        require(stakes[msg.sender] < contributionLimit, "Contribution limit reached"); //prevent reentrency
        _;
    }

    modifier sufficientBalance(uint256 amountToWithdraw){
        require(amountToWithdraw > 0, "error: withdraw 0 EWT");
        require(balanceOf(msg.sender) != 0, "No deposit at stake");
        require(balanceOf(msg.sender) >= amountToWithdraw, "Not enough EWT at stake");
        _;
    }

    modifier withdrawsAllowed(){
        require(aborted || block.timestamp < startDate || (block.timestamp >= endDate && block.timestamp < fullStopDate), "Withdraws not allowed");
        require(hasRole(msg.sender, patronRole), "No patron role");
        _;
    }

    modifier notAborted(){
        require(!aborted, "Campaign aborted");
        _;
    }

    modifier notfunded(){
        require(contractFunded == false, "Already funded");
        _;
    }

    modifier minStaked() {
        require(msg.value >= minRequiredStake, "Value to low");
        _;
    }

    modifier sufficientReward(){
        uint256 TWELVE_PERCENT = totalStaked * (12 * 1e3 / 100);
        require(msg.value >= TWELVE_PERCENT / 1e3, "Not Enough rewards");
        _;
    }

    function depositRewards() external payable sufficientReward notAborted activated notfunded {
        require(msg.value > 0, "No rewards provided");
        require(hasRole(msg.sender, serviceRole) || (msg.sender == rewardProvider), "Not enrolled as service provider");
        totalRewards += msg.value;
        contractFunded = true;
        emit RewardSent(msg.sender, msg.value, block.timestamp);
    }

    function burn(uint256 _amount) public override {
        redeem(_amount);
    }

    //Overriding ERC20 transfer function
    function transfer(address _recipient, uint256 _amount) public override returns (bool) {
        //we need to keep track of this to avoid negative values on redeem call
        stakes[_recipient] += _amount;
        unchecked {
            stakes[_msgSender()] -= _amount;
        }
        _transfer(_msgSender(), _recipient, _amount);
        return true;
    }

    function init(
        uint256 _signupStart,
        uint256 _signupEnd,
        uint256 _startDate,
        uint256 _endDate,
        uint256 _fullStopDate,
        uint256 _hardCap,
        uint256 _contributionLimit,
        uint256 _minRequiredStake
    ) external onlyOwner {
        require(!isContractInitialized, "Already initialized");//Preventing resetting by owner
        require(_contributionLimit > 0, "wrong contribution limit");
        require(_hardCap >= _contributionLimit, "Hardcap Exceeded");
        require(_signupStart < _signupEnd, "Wrong signup config");
        require(_startDate > _signupEnd, "Start febore signup period");
        require(_fullStopDate > _endDate, "FullStop before endDate");
		endDate = _endDate;
        hardCap = _hardCap;
		startDate = _startDate;
        signupEnd = _signupEnd;
        signupStart = _signupStart;
        isContractInitialized = true;
        contributionLimit = _contributionLimit;
        minRequiredStake = _minRequiredStake;
        fullStopDate = _fullStopDate;
		emit StakingPoolInitialized(block.timestamp, _startDate, _endDate);
    }

    function pause() external onlyOwner notPaused {
        isContractPaused = true;
        emit StatusChanged("contractPaused", block.timestamp);
    }

     function unPause() public onlyOwner paused {
        isContractPaused = false;
        emit StatusChanged("contractUnpaused", block.timestamp);
    }

    function deleteParameters() internal {
		delete hardCap;
        delete signupEnd;
        delete totalRewards;
        delete isContractPaused;
		delete contributionLimit;
    }

    function terminate() external onlyOwner {
        require(aborted == false, "Already terminated");
        require(block.timestamp < endDate, "Error: canceling after campaign");
		uint256 payout = totalRewards;
        aborted = true;
        deleteParameters();
        if (payout != 0){
		    payable(rewardProvider).transfer(payout);
        }
        emit StatusChanged("campaignAborted", block.timestamp);
        emit CampaignAborted(block.timestamp);
    }

    function sweep() external {
        require(hasRole(msg.sender, serviceRole) || (msg.sender == rewardProvider), "Not allowed to sweep");
        require(!sweeped, "Already sweeped");
		require(block.timestamp >= fullStopDate, "Cannot sweep before expiry");
        uint256 remainingRewards = totalRewards - allRedeemedRewards;
        uint256 remainingFunds = totalStaked;

		sweeped = true;
        deleteParameters();
        delete totalStaked;
		payable(rewardProvider).transfer(remainingRewards + remainingFunds);
        emit Swept(remainingRewards, block.timestamp);
    }

    function getContractStatus() external view returns(bool _isContractInitialized, bool _isContractPaused, bool _isContractAborted){
        _isContractInitialized = isContractInitialized;
        _isContractPaused = isContractPaused;
        _isContractAborted = aborted;
    }

    function refund(uint256 _amount) internal {
        payable(msg.sender).transfer(_amount);
    }

     function stake() external payable notAborted initialized belowLimit notPaused minStaked {
        require(hasRole(msg.sender, patronRole), "No patron role");

        if ((stakes[msg.sender] + msg.value > contributionLimit)){

            uint256 overFlow_limit = msg.value + stakes[msg.sender] - contributionLimit;
            //Check if we overflow from hardCap
            if ((totalStaked + contributionLimit - stakes[msg.sender]) > hardCap){
                uint256 overFlow_hardCap = contributionLimit + totalStaked - stakes[msg.sender] - hardCap;
                
                _mint(msg.sender, hardCap - totalStaked);
                emit NewStake(msg.sender, hardCap - totalStaked, block.timestamp);
                emit RefundExceeded((msg.sender), msg.value, overFlow_limit + overFlow_hardCap);
                uint256 payout = msg.value + totalStaked - hardCap;
                stakes[msg.sender] += hardCap - totalStaked;
                totalStaked += hardCap - totalStaked;
                refund(payout);
            } else {
                _mint(msg.sender, contributionLimit - stakes[msg.sender]);
                emit NewStake(msg.sender, contributionLimit - stakes[msg.sender], block.timestamp);
                emit RefundExceeded((msg.sender), msg.value, overFlow_limit);
                totalStaked += contributionLimit - stakes[msg.sender];
                stakes[msg.sender] += contributionLimit - stakes[msg.sender];
                refund(overFlow_limit);
            }
        } else { 
            if (totalStaked + msg.value > hardCap){

                stakes[msg.sender] += hardCap - totalStaked;
                _mint(msg.sender, hardCap - totalStaked);
                emit NewStake(msg.sender, hardCap - totalStaked, block.timestamp);
                emit RefundExceeded((msg.sender), msg.value, msg.value - (hardCap - totalStaked));
                totalStaked += hardCap - totalStaked;
                refund(msg.value - (hardCap - totalStaked));
            } else {   
                stakes[msg.sender] += msg.value;
                emit NewStake(msg.sender, msg.value, block.timestamp);
                _mint(msg.sender, msg.value);
                totalStaked += msg.value;
            }
        }
    }

    function getDeposit() external view returns(uint256) {
        return stakes[msg.sender];
    }

    function redeemAll() external notPaused {
        redeem(balanceOf(msg.sender));
    }
    
    function redeem(uint256 _amount) public notPaused withdrawsAllowed sufficientBalance(_amount) {
        (uint256 toWithdraw, uint256 bonus) = _getRewards(_amount);
        allRedeemedRewards += bonus;

        _burn(_msgSender(), _amount);
        totalStaked -= _amount;
        stakes[msg.sender] -= _amount;
        payable(msg.sender).transfer(toWithdraw);
        emit Withdrawn(msg.sender, toWithdraw, block.timestamp);
        emit TokenBurnt(msg.sender, _amount, block.timestamp);
    }

    function hasRole(address _provider, bytes32 _role) public view returns (bool){
		IClaimManager claimManager = IClaimManager(claimManagerAddress); // Contract deployed and maintained by EnergyWeb Fondation
        return (claimManager.hasRole(_provider, _role, 1));
    }

    function _getRewards(uint256 _amount) internal view returns(uint256, uint256){

        // Preventing funds loss if redemption occurs before the campaign start (we don't have to pay 10% before the end of the campaign)
        if (!aborted && totalRewards != 0 && _amount != 0){ 
            
            /* Bonus calculation
            *   Bonus = (_amount * 1e2) / 1e3 --> Bonus = _amount / 10
            *  returns (reward, bonus)
            */
            return (_amount + _amount / 10, _amount / 10);
        }
        return (_amount, 0);
    }

    function getRewards() external view returns (uint256){
        (uint256 rewards, ) = _getRewards(balanceOf(msg.sender));
        return rewards;
    }
}