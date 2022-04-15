//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

// import "hardhat/console.sol";

contract Project {
    address public creator;
    uint256 public goalAmount;
    uint public deadline;
    // minimumContribution for all projects by default in ETH
    uint256 public constant minimumContribution = 0.01 ether;
    
    // TODO: Use enum for project statuses
    // enum ProjectStatus{ ACTIVE, SUCCESS, FAILURE }
    string projectStatus;
    // TODO: Solve string comparison  TypeError: Operator == not compatible with types string storage ref and literal_string "ACTIVE"
    bool isActive;
    bool isSuccess;
    bool isFailure;

    // Ether held by the contract on behalf of contributors/pledgers
    mapping(address => uint) public contributionOf;

    uint256 public totalContribution;
    uint256 public remainingContribution;

    event ContributionMade(address contributor, uint amount);
    event WithdrawalMade(uint amount);
    event refundMade(address contributor, uint amount);

    constructor (address _creator, uint256 _goalAmount) public {
        creator = _creator;
        goalAmount = _goalAmount;
        deadline = block.timestamp + 30 days;
        isActive = true;
        isFailure = false;
        isSuccess = false;
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

    function checkAndUpdateProjectStatus() private {
        if (totalContribution >= goalAmount) {
            isSuccess = true;
            isFailure = false;
            isActive = false;
        } else {
            if (block.timestamp >= deadline) {
                isFailure = true;
                isSuccess = false;
                isActive = false;
            }
        }
    }

    function contribute() external payable {
        checkAndUpdateProjectStatus();
        require(block.timestamp < deadline, "project is not ACTIVE anymore");
        require(totalContribution < goalAmount, "project is fully funded and doesn't accept contribution anymore");
        require(msg.value >= minimumContribution, "contribution amount is too small");

        contributionOf[msg.sender] += msg.value;
        totalContribution += msg.value;
        remainingContribution += msg.value;

        emit ContributionMade(msg.sender, msg.value);
    }

    // get the total amount of ETH owned by the contribute
    function getContribution(address owner) public view returns (uint) {
        return contributionOf[owner ];
    }    

    function withdrawFunds(uint amountToWithdraw) external payable {
        checkAndUpdateProjectStatus();

        require(msg.sender == creator, "funds could only be withdrawn by the creator");
        require(isFailure == false, "project is FAILURE");
        require(totalContribution >= goalAmount, "project is not fully funded yet");
        require(isSuccess == true, "project is not SUCCESS yet");
        require(amountToWithdraw <= remainingContribution, 'you do not have enough balance');

        remainingContribution -= amountToWithdraw;
        (bool success, ) = (msg.sender).call{value: amountToWithdraw}("");
        require(success, "withdrawal failed");

        emit WithdrawalMade(amountToWithdraw);
    }

    function refundContributions() external payable {
        // TODO: Add checking only if funding goal not met, exceeding deadline, etc
        checkAndUpdateProjectStatus();
        require(isFailure == true, "project is not FAILURE");

        uint256 amount = contributionOf[msg.sender];
        require(amount > 0, "no money to brefunded");

        contributionOf[msg.sender] = 0;
        (bool success, ) = (msg.sender).call{value: amount}("");
        require(success, "refund failed");

        emit refundMade(msg.sender, amount);
    }

    function cancelProject() external {
        require(msg.sender == creator, "cancellation can only be done by creator");
        require(block.timestamp < deadline, "cancellation could not be after 30 days passed");

        isFailure = true;
        isSuccess = false;
        isActive = false;
    }
}