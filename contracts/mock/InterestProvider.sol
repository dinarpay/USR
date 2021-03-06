pragma solidity 0.5.12;

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

import "../interface/IInterestProvider.sol";

//import "@nomiclabs/buidler/console.sol";

contract MockInterestProvider is IInterestProvider {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    IERC20 public USDx;

    address public funds;

    constructor(address _USDx, address _funds) public {
        USDx = IERC20(_USDx);
        funds = _funds;
    }

    function getInterestAmount() public returns (uint256) {
        return USDx.balanceOf(funds);
    }

    /**
     * @dev Withdraw the interest generated by USDx.
     * @param _amount USDx withdrawal amount.
     * @return Withdraw USDx amount.
     */
    function withdrawInterest(uint256 _amount) external {
        //console.log("About to transfer %d from %s", _amount, address(USDx));
        USDx.safeTransferFrom(funds, msg.sender, _amount);
    }
}
