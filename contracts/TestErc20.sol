pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    constructor() public ERC20("TestToken", "TST") {
        _mint(msg.sender, 10000000000000000000000000);
    }
}
