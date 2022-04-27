
// File: @openzeppelin/contracts/utils/Context.sol


// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

// File: @openzeppelin/contracts/token/ERC20/IERC20.sol


// OpenZeppelin Contracts v4.4.1 (token/ERC20/IERC20.sol)

pragma solidity ^0.8.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

// File: @openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol


// OpenZeppelin Contracts v4.4.1 (token/ERC20/extensions/IERC20Metadata.sol)

pragma solidity ^0.8.0;


/**
 * @dev Interface for the optional metadata functions from the ERC20 standard.
 *
 * _Available since v4.1._
 */
interface IERC20Metadata is IERC20 {
    /**
     * @dev Returns the name of the token.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the symbol of the token.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the decimals places of the token.
     */
    function decimals() external view returns (uint8);
}

// File: @openzeppelin/contracts/token/ERC20/ERC20.sol


// OpenZeppelin Contracts v4.4.1 (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;




/**
 * @dev Implementation of the {IERC20} interface.
 *
 * This implementation is agnostic to the way tokens are created. This means
 * that a supply mechanism has to be added in a derived contract using {_mint}.
 * For a generic mechanism see {ERC20PresetMinterPauser}.
 *
 * TIP: For a detailed writeup see our guide
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * We have followed general OpenZeppelin Contracts guidelines: functions revert
 * instead returning `false` on failure. This behavior is nonetheless
 * conventional and does not conflict with the expectations of ERC20
 * applications.
 *
 * Additionally, an {Approval} event is emitted on calls to {transferFrom}.
 * This allows applications to reconstruct the allowance for all accounts just
 * by listening to said events. Other implementations of the EIP may not emit
 * these events, as it isn't required by the specification.
 *
 * Finally, the non-standard {decreaseAllowance} and {increaseAllowance}
 * functions have been added to mitigate the well-known issues around setting
 * allowances. See {IERC20-approve}.
 */
contract ERC20 is Context, IERC20, IERC20Metadata {
    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;

    /**
     * @dev Sets the values for {name} and {symbol}.
     *
     * The default value of {decimals} is 18. To select a different value for
     * {decimals} you should overload it.
     *
     * All two of these values are immutable: they can only be set once during
     * construction.
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    /**
     * @dev Returns the name of the token.
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5.05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei. This is the value {ERC20} uses, unless this function is
     * overridden;
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     * @dev See {IERC20-approve}.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20}.
     *
     * Requirements:
     *
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     * - the caller must have allowance for ``sender``'s tokens of at least
     * `amount`.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {
        _transfer(sender, recipient, amount);

        uint256 currentAllowance = _allowances[sender][_msgSender()];
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        unchecked {
            _approve(sender, _msgSender(), currentAllowance - amount);
        }

        return true;
    }

    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender] + addedValue);
        return true;
    }

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        uint256 currentAllowance = _allowances[_msgSender()][spender];
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        unchecked {
            _approve(_msgSender(), spender, currentAllowance - subtractedValue);
        }

        return true;
    }

    /**
     * @dev Moves `amount` of tokens from `sender` to `recipient`.
     *
     * This internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        uint256 senderBalance = _balances[sender];
        require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");
        unchecked {
            _balances[sender] = senderBalance - amount;
        }
        _balances[recipient] += amount;

        emit Transfer(sender, recipient, amount);

        _afterTokenTransfer(sender, recipient, amount);
    }

    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);

        _afterTokenTransfer(address(0), account, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = accountBalance - amount;
        }
        _totalSupply -= amount;

        emit Transfer(account, address(0), amount);

        _afterTokenTransfer(account, address(0), amount);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
     *
     * This internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    /**
     * @dev Hook that is called before any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}

    /**
     * @dev Hook that is called after any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * has been transferred to `to`.
     * - when `from` is zero, `amount` tokens have been minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens have been burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}
}

// File: @openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol


// OpenZeppelin Contracts v4.4.1 (token/ERC20/extensions/ERC20Burnable.sol)

pragma solidity ^0.8.0;



/**
 * @dev Extension of {ERC20} that allows token holders to destroy both their own
 * tokens and those that they have an allowance for, in a way that can be
 * recognized off-chain (via event analysis).
 */
abstract contract ERC20Burnable is Context, ERC20 {
    /**
     * @dev Destroys `amount` tokens from the caller.
     *
     * See {ERC20-_burn}.
     */
    function burn(uint256 amount) public virtual {
        _burn(_msgSender(), amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, deducting from the caller's
     * allowance.
     *
     * See {ERC20-_burn} and {ERC20-allowance}.
     *
     * Requirements:
     *
     * - the caller must have allowance for ``accounts``'s tokens of at least
     * `amount`.
     */
    function burnFrom(address account, uint256 amount) public virtual {
        uint256 currentAllowance = allowance(account, _msgSender());
        require(currentAllowance >= amount, "ERC20: burn amount exceeds allowance");
        unchecked {
            _approve(account, _msgSender(), currentAllowance - amount);
        }
        _burn(account, amount);
    }
}

// File: contracts/interfaces/IClaimManager.sol


pragma solidity ^0.8.12;

interface IClaimManager {
	function hasRole(
		address subject,
		bytes32 role,
		uint256 version
	) external view returns (bool);
}
// File: contracts/Staking.sol



pragma solidity ^0.8.12;



contract Staking is ERC20Burnable {
    bool public sweeped;
    bool public aborted;
    address public owner;
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

    function burnFrom(address account, uint256 amount) public pure override {
        revert("burnFrom Not Allowed");
    }

    //Overriding ERC20 transfer function
    function transfer(address _recipient, uint256 _amount) public override returns (bool) {
        //we need to keep track of this to avoid negative values on redeem call
        stakes[_recipient] += _amount;
        stakes[_msgSender()] -= _amount;
        _transfer(_msgSender(), _recipient, _amount);
        return true;
    }

    function transferFrom(address _sender, address _recipient, uint256 _amount) public override returns (bool) {
        //we need to keep track of this to avoid negative values on redeem call
        ERC20.transferFrom(_sender, _recipient, _amount);
        stakes[_recipient] += _amount;
        stakes[_sender] -= _amount;
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