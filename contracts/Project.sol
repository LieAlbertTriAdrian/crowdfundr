//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Project is ERC721 {
    uint public constant minimumContribution = 0.01 ether;

    address public creator;
    uint public goalAmount;
    uint public deadline;
    // minimumContribution for all projects by default in ETH
    
    enum ProjectStatus{ ACTIVE, SUCCESS, FAILURE }
    bool isCancelled;

    // Ether held by the contract on behalf of contributors/pledgers
    mapping(address => uint) public contributionOf;
    mapping(address => uint) public badgeOf;

    uint public totalContribution;
    uint public remainingContribution;

    event ContributionMade(address indexed contributor, uint amount);
    event WithdrawalMade(uint amount);
    event RefundMade(address indexed contributor, uint amount);
    event CancellationMade();

    constructor (address _creator, uint _goalAmount) ERC721("Project Contribution Badge", "PCB") {
        creator = _creator;
        goalAmount = _goalAmount;
        deadline = block.timestamp + 30 days;
    }

    function checkStatus() private view returns (ProjectStatus) {
        if (totalContribution >= goalAmount) {
            return ProjectStatus.SUCCESS;
        } else {
            if (block.timestamp >= deadline) {
                return ProjectStatus.FAILURE;
            }
        }

        return ProjectStatus.ACTIVE;
    }

    function contribute() external payable {
        require(checkStatus() == ProjectStatus.ACTIVE, "project is not ACTIVE anymore");
        require(msg.value >= minimumContribution, "contribution amount is too small");

        uint previousContribution = contributionOf[msg.sender];
        contributionOf[msg.sender] += msg.value;
        totalContribution += msg.value;
        remainingContribution += msg.value;

        // Note: Upper and floor function don't exist so * 1 ether and / 1 ether are being used here e.g. / 1 ether + 1 is upper function then * 1 ether to change it back to ether
        if (contributionOf[msg.sender] >= (previousContribution / 1 ether + 1 ) * 1 ether) {
            uint additionalBadge = ( (contributionOf[msg.sender] / 1 ether) - badgeOf[msg.sender] ) / 1;

            badgeOf[msg.sender] += additionalBadge;
            _mint(msg.sender, badgeOf[msg.sender]);
        }

        emit ContributionMade(msg.sender, msg.value);
    }

    // get the total amount of ETH owned by the contributor
    function getContribution(address owner) public view returns (uint) {
        return contributionOf[owner ];
    }

    // get the total badges owned by the contributor
    function getBadge(address owner) public view returns (uint) {
        return badgeOf[owner ];
    }

    // TODO: The difference between payable in .call vs payable in the function declaration
    function withdrawFunds(uint amountToWithdraw) external payable {
        require(msg.sender == creator, "funds could only be withdrawn by the creator");
        require(checkStatus() == ProjectStatus.SUCCESS, "project is not SUCCESS");
        require(totalContribution >= goalAmount, "project is not fully funded yet");
        require(amountToWithdraw <= remainingContribution, 'you do not have enough balance');

        remainingContribution -= amountToWithdraw;
        (bool success, ) = (msg.sender).call{value: amountToWithdraw}("");
        require(success, "withdrawal failed");

        emit WithdrawalMade(amountToWithdraw);
    }

    function refundContributions() external payable {
        require(checkStatus() == ProjectStatus.FAILURE, "project is not FAILURE");

        uint amount = contributionOf[msg.sender];
        require(amount > 0, "no money to brefunded");

        contributionOf[msg.sender] = 0;
        (bool success, ) = (msg.sender).call{value: amount}("");
        require(success, "refund failed");

        emit RefundMade(msg.sender, amount);
    }

    function cancelProject() external {
        require(msg.sender == creator, "cancellation can only be done by creator");
        require(checkStatus() == ProjectStatus.ACTIVE, "cancellation could not be after 30 days passed");

        isCancelled = true;

        emit CancellationMade();
    }
}