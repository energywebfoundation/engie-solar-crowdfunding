interface IClaimManager {
	function hasRole(
		address subject,
		bytes32 role,
		uint256 version
	) external view returns (bool);
}