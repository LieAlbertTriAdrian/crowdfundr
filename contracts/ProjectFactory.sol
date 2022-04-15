//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import './Project.sol';

contract ProjectFactory {
    Project[] public deployedProjects;

    event ProjectCreated(address newProject, uint goalAmount); // Note: you should add additional data fields in this event

    function create(uint goalAmount) external {
        // TODO: Remove hardcode parameter for target
        Project project = new Project(msg.sender, goalAmount);
        deployedProjects.push(project);

        emit ProjectCreated(address(0xdeadbeef), goalAmount); // TODO: replace me with the actual Project's address
    }

    function getDeployedProjects() public view returns (Project[] memory) {
        return deployedProjects;
    }
}
