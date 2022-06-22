//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.0;

import "./ResourceToken.sol";

contract ResourceTokenFactory {
    ResourceToken[] public ResourceTokens;

    event TokenCreated(ResourceToken token);

    function createResourceToken(string memory name, string memory symbol)
        public
    {
        ResourceToken token = new ResourceToken(name, symbol);
        ResourceTokens.push(token);
        emit TokenCreated(token);
    }
}
