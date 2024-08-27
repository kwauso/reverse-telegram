// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PaperCoin is ERC20 {

    constructor() ERC20("PaperCoin", "PAC") {
        _mint(msg.sender, 10000*10**18);
    }
}