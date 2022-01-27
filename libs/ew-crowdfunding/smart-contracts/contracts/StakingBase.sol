// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './libs/IClaimManager.sol';

contract StakingBase {

    struct Stake {
        uint256 time;
        uint256 deposit;
    }

    mapping(address => Stake) stakes;

    function saveDeposit(uint256 _deposit, address _user, uint256 _timeStamp) internal {
        Stake memory userStake = Stake(_timeStamp, _deposit);
        stakes[_user] = userStake;
    }

    function hasRole(address _userAddress, address _claimManagerAddress, bytes32 _role) internal view returns (bool){
		IClaimManager claimManager = IClaimManager(_claimManagerAddress); // Contract deployed and maintained by EnergyWeb Fondation
        return (claimManager.hasRole(_userAddress, _role, 1));
    }

    function isServiceProvider(address _provider, address _claimManager, bytes32 _role) internal  view returns (bool _hasRole){
        require(hasRole(_provider, _claimManager, _role), 'Not a service provider');
        _hasRole = true;
    }
}