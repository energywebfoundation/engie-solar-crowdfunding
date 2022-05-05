// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.12;
import "./Staking.sol";
import "./interfaces/IClaimManager.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Redeem is ERC20Burnable {
    address public admin;
    address public solarToken;

    const PATRON_ROLE = 0xac3d6e1fcd0ee5dd4a0a7c2405310bb9588579aeef902b5a4d070137d05033c4; //; Role Namespace: eeaapproved.roles.eea.apps.engie.auth.ewc

    mapping(address => uint256) public withdrawers;
    
    constructor(address _tokenContract, uint256 _initialFunding) payable {
        admin = _initialFunding;
        solarToken = _tokenContract;
    }

    function refund(uint256 _amount) external {
        Staking slt = new Staking(solarToken);

        require(block.timestamp <= slt.signupEnd, "Refund are not possible after locks");
        require(slt.hasRole(msg.sender, PATRON_ROLE), "User not  enrolled");
        require(slt.balanceOf(msg.sender) >= _amount, "No sufficient SLTs");
        //Allow the contract to move SLTs from requester wallet;
        slt.approve(address(this), _amount);
        //send SLT to the current contract
        slt.transferFrom(msg.sender, address(this), _amount);
        payable(msg.sender).transfer(_amount);
        //burn the corresponding SLTs
        slt.burn((_amount));
    }
}