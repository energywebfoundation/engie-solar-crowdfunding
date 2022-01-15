// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { IERC173 } from "../interfaces/IERC173.sol";
import { LibStaking } from "../libraries/LibStaking.sol";
import { LibDiamond } from "../libraries/LibDiamond.sol";

contract stakingBase {
    function getStoragePointer() internal pure returns(LibStaking.StakingStorage storage _pointer){
       _pointer = LibStaking.stakingStorage();
    }

    function saveDeposit(uint256 _deposit, address _user, uint256 _timeStamp) internal {
        LibStaking.StakingStorage storage pointer = LibStaking.stakingStorage();
        uint256 id = pointer.stakerCount + 1;
        LibStaking.Stake memory userStake = LibStaking.Stake(id, _timeStamp, _deposit);
        pointer.stakes[_user] = userStake;
        pointer.stakerCount = id;
    }

    function recordStaker(address _user) internal {
        LibStaking.StakingStorage storage pointer = LibStaking.stakingStorage();

        pointer.isStaker[_user] = true;
    }
    
    function updateTotal(uint256 _amount) internal {
        LibStaking.StakingStorage storage pointer = LibStaking.stakingStorage();

        pointer.totalStaked += _amount;
    }

    function canStake(address _user) internal view returns(bool isAllowed){
        LibStaking.StakingStorage storage stakingPool = LibStaking.stakingStorage();
        require(
            stakingPool.isStaker[_user] == false && stakingPool.stakes[_user].deposit == 0,
            'Already staking'
        );
        //accepting contributions 2 weeks before start date
        uint256 contributionDate = stakingPool.startDate - 2 weeks;
        require(block.timestamp >= contributionDate, "Contributions not yet allowed");

        require(block.timestamp < stakingPool.startDate, "Staking contributions are no longer accepted");
        //To-Do: Check if ther user has the appropriate role in ClaimManager

        isAllowed = true;
    }

    function getDeposit(address _staker) internal view returns(uint256 _deposit){
        LibStaking.StakingStorage storage pointer = getStoragePointer();

        _deposit = pointer.stakes[_staker].deposit;
    }

    function removeStaker(address _staker) internal {
        LibStaking.StakingStorage storage pointer = getStoragePointer();

        pointer.isStaker[_staker] = false;
        pointer.stakes[_staker].deposit = 0;

    }

    function withdraw(uint256 _deposit, address payable _recipient) internal {
        _recipient.transfer(_deposit);
        removeStaker(_recipient);
    }
}

contract StakingFacet is stakingBase {

    modifier onlyOwner(){
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        LibDiamond.enforceIsContractOwner();
        _;
    }

    function init(uint256 _startDate) external onlyOwner {
		//Users have two weeks to contribute EWT before the site stops accepting contributions
        require(_startDate >= block.timestamp + 2 weeks, "Start date should be at least 2 weeks ahead");
		uint256 endDate = _startDate + 54 weeks;
        LibStaking.StakingStorage storage pointer = getStoragePointer();
		pointer.startDate = _startDate;
		pointer.endDate = endDate;

		emit LibStaking.StakingPoolInitialized(block.timestamp, _startDate, endDate);
	}

    function stake() payable external {
        require(msg.value > 0, 'No EWT provided');
        require(canStake(msg.sender));
        saveDeposit(msg.value, msg.sender, block.timestamp);
        recordStaker(msg.sender);
        updateTotal(msg.value);
    }

    function unstake() external {
        require(!canStake(msg.sender), 'No Ewt at stake');
        uint256 deposit = getDeposit(msg.sender);
        withdraw(deposit, payable(msg.sender));
    }

    function getStake() external view returns(LibStaking.Stake memory _stake){
        LibStaking.StakingStorage storage pointer = getStoragePointer();

        _stake = pointer.stakes[msg.sender];
    }
}
