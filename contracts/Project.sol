//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Project {
    address public creator;
    uint256 public targetAmount;
    // minimumContribution for all projects by default in ETH
    // TODO: Change to 0.01 ETH
    uint256 public constant minimumContribution = 1;

    // Ether held by the contract on behalf of contributors/pledgers
    mapping(address => uint256) public contributionOf;

    constructor (address _creator, uint256 _targetAmount) public {
        creator = _creator;
        targetAmount = _targetAmount;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);
        // TODO: Check for deadline of the project

        contributionOf[msg.sender] += msg.value;
    }
}