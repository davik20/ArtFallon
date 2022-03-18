pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Maribu is ERC20  {
   
    constructor() ERC20("Maribu", "MRB") public{
            _mint(msg.sender, 10000000000000000000000000);
    }

}