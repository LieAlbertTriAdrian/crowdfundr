//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Project {
    address public creator;
    uint256 public goalAmount;
    // minimumContribution for all projects by default in ETH
    // TODO: Change to 0.01 ETH
    uint256 public constant minimumContribution = 0.01 ether;

    // Ether held by the contract on behalf of contributors/pledgers
    mapping(address => uint) public contributionOf;

    constructor (address _creator, uint256 _goalAmount) public {
        creator = _creator;
        goalAmount = _goalAmount;
    }

    function getSummary()
        public
        view
        returns (
            uint256
        )
    {
        return (
            goalAmount
        );
    }

    function contribute() external payable {
        require(msg.value >= minimumContribution, "contribution amount is too small");
        // TODO: Check for deadline of the project

        contributionOf[msg.sender] += msg.value;
    }

    // get the total amount of ETH owned by the contribute
    function getContribution(address owner) public view returns (uint) {
        return contributionOf[owner ];
    }    

    function withdrawFunds() external payable {
        require(msg.sender == creator);
        require(address(this).balance >= goalAmount);
        // TODO: Add more checking such as deadline, etc

        (bool success, ) = (msg.sender).call{value: address(this).balance}("");
        require(success, "withdrawal failed");
    }

    function refundContributions() external payable {
        // TODO: Add checking only if funding goal not met, exceeding deadline, etc

        uint256 amount = contributionOf[msg.sender];
        contributionOf[msg.sender] = 0;

        (bool success, ) = (msg.sender).call{value: amount}("");
        require(success, "refund failed");
    }    
}