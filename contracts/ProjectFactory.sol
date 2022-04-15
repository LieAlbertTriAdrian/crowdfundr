//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import './Project.sol';

contract ProjectFactory {
    Project[] public deployedProjects;

    event ProjectCreated(address newProject); // Note: you should add additional data fields in this event

    function create() external {
        Project newProject = new Project();
        deployedProjects.push(newProject);

        emit ProjectCreated(address(0xdeadbeef)); // TODO: replace me with the actual Project's address
    }
}
