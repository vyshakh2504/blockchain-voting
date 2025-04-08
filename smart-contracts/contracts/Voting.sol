// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Voting {
    address public admin;

    struct Candidate {
        uint id;
        string name;
        string manifestoCID;
        uint voteCount;
    }

    struct Voter {
        bool hasVoted;
        bool isRegistered;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => Voter) public voters;

    uint public candidatesCount;
    bool public electionEnded;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    function registerCandidate(string memory _name, string memory _cid) public onlyAdmin {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _cid, 0);
    }

    function registerVoter(address _voter) public onlyAdmin {
        voters[_voter] = Voter(false, true);
    }

    function vote(uint _candidateId) public {
        require(!electionEnded, "Election ended");
        require(voters[msg.sender].isRegistered, "Not registered");
        require(!voters[msg.sender].hasVoted, "Already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");

        voters[msg.sender].hasVoted = true;
        candidates[_candidateId].voteCount++;
    }

    function endElection() public onlyAdmin {
        electionEnded = true;
    }

    function getCandidate(uint _id) public view returns (Candidate memory) {
        return candidates[_id];
    }
}
