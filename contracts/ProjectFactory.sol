//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import {Project} from "./Project.sol";

contract ProjectFactory {
    Project[] public projects;

    event ProjectCreated(
        address indexed creator,
        address project,
        uint256 _goalAmount
    );

    function create(uint256 _goalAmount) external {
        Project project = new Project(msg.sender, _goalAmount);
        projects.push(project);

        emit ProjectCreated(msg.sender, address(project), _goalAmount);
    }

    function getProjects() public view returns (Project[] memory) {
        return projects;
    }
}
