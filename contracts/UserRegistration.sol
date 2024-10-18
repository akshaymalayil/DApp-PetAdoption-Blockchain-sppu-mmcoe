// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;


contract UserRegistration {
    mapping(address => string) public userEmails; // Mapping to store user emails


    // Function to register a user
    function registerUser(string memory email) public {
        require(bytes(email).length > 0, "Email cannot be empty");
        userEmails[msg.sender] = email;
    }


    // Function to retrieve the user's email
    function getEmail() public view returns (string memory) {
        return userEmails[msg.sender];
    }
}
