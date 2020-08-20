pragma solidity ^0.5.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";
import "./Pausable.sol";

/**
 * @title Pausable token
 * @dev ERC20 with pausable transfers and allowances.
 *
 * Useful if you want to stop trades until the end of a crowdsale, or have
 * an emergency switch for freezing all token transfers in the event of a large
 * bug.
 */
contract ERC20Pausable is Initializable, ERC20, Pausable {
    function initialize(address sender) public initializer {
        Pausable.initialize(sender);
    }

    function transfer(address to, uint256 value)
        public
        whenNotPaused
        returns (bool)
    {
        return super.transfer(to, value);
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public whenNotPaused returns (bool) {
        return super.transferFrom(from, to, value);
    }

    function approve(address spender, uint256 value)
        public
        whenNotPaused
        returns (bool)
    {
        return super.approve(spender, value);
    }

    function increaseAllowance(address spender, uint256 addedValue)
        public
        whenNotPaused
        returns (bool)
    {
        return super.increaseAllowance(spender, addedValue);
    }

    function decreaseAllowance(address spender, uint256 subtractedValue)
        public
        whenNotPaused
        returns (bool)
    {
        return super.decreaseAllowance(spender, subtractedValue);
    }

    uint256[50] private ______gap;
}
