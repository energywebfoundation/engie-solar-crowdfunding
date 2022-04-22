// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

interface IClaimManager {
	function hasRole(
		address subject,
		bytes32 role,
		uint256 version
	) external view returns (bool);
}