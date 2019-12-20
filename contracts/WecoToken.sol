pragma solidity ^0.5.0;

// import "@openzeppelin/contracts/token/ERC777/ERC777.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.3.0/contracts/token/ERC777/ERC777.sol";

// Enter operators as ["address1","address2"]
contract WecoToken is ERC777 {

    constructor() public ERC777("Weco", "WECO", new address[](0)) {
        _mint(msg.sender, msg.sender, 21000000 * 10 ** 18, "", "");
    }
}
