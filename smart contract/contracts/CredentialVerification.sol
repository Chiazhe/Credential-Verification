// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/access/AccessControl.sol";
pragma solidity ^0.8.9;

contract CredentialVerification is AccessControl {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(ISSUER_ROLE, _msgSender());
    }

    struct Credential {
        address issuer;
        address holder;
        string issuerName;
        string holderName;
        string title;
        string description;
        uint dateIssued;
        uint dateExpired;
        bytes32 accessToken;
        uint accessTokenValidUntil;
    }

    mapping(bytes32 => Credential) private credentials;
    mapping(address => bytes32[]) private credentialsByHolder;

    event CredentialCreated(
        bytes32 indexed credentialHash,
        address indexed holder,
        address indexed issuer
    );

    event AccessTokenUpdated(
        bytes32 indexed credentialHash,
        bytes32 accessToken
    );

    function createCredential(
        address _holder,
        string memory _issuerName,
        string memory _holderName,
        string memory _title,
        string memory _description,
        uint _dateIssued,
        uint _dateExpired
    ) public returns (bytes32) {
        require(
            hasRole(ISSUER_ROLE, _msgSender()),
            "You must have issuer role to issue credentials"
        );
        bytes memory packedValue = abi.encodePacked(
            msg.sender,
            _holder,
            _issuerName,
            _holderName,
            _title,
            _description,
            _dateIssued,
            _dateExpired
        );
        bytes32 credentialHash = keccak256(packedValue);
        credentials[credentialHash] = Credential({
            issuer: msg.sender,
            holder: _holder,
            issuerName: _issuerName,
            holderName: _holderName,
            title: _title,
            description: _description,
            dateIssued: _dateIssued,
            dateExpired: _dateExpired,
            accessToken: credentialHash,
            accessTokenValidUntil: block.timestamp
        });
        generateAccessToken(credentialHash);
        credentialsByHolder[_holder].push(credentialHash);

        emit CredentialCreated(credentialHash, _holder, msg.sender);
        return credentialHash;
    }

    function verifyCredential(
        bytes32 _credentialHash,
        bytes32 _accessToken
    ) public view returns (Credential memory) {
        require(
            credentials[_credentialHash].accessToken == _accessToken,
            "Invalid access token!"
        );
        Credential storage credential = credentials[_credentialHash];
        return credential;
    }

    function getCredentialsByHolder(
        address _holder
    ) public view returns (Credential[] memory, bytes32[] memory) {
        bytes32[] memory holderCredentialHashes = credentialsByHolder[_holder];
        Credential[] memory holderCredentials = new Credential[](
            holderCredentialHashes.length
        );
        for (uint i = 0; i < holderCredentialHashes.length; i++) {
            holderCredentials[i] = credentials[holderCredentialHashes[i]];
        }
        return (holderCredentials, holderCredentialHashes);
    }

    function getOneCredentialByHolder(
        address _requester,
        bytes32 _credentialHash
    ) public view returns (Credential memory) {
        require(credentials[_credentialHash].holder == _requester);
        Credential storage credential = credentials[_credentialHash];
        return credential;
    }

    function getAccessToken(
        bytes32 _credentialHash,
        address _requester
    ) public view returns (bytes32) {
        require(
            _requester == credentials[_credentialHash].holder ||
                _requester == credentials[_credentialHash].issuer,
            "This function is only for holder or issuer!"
        );
        return credentials[_credentialHash].accessToken;
    }

    function generateAccessToken(bytes32 _credentialHash) public {
        require(
            msg.sender == credentials[_credentialHash].holder ||
                msg.sender == credentials[_credentialHash].issuer,
            "This function is only for holder!"
        );
        bytes32 _newAccessKey = keccak256(
            abi.encodePacked(block.timestamp, _credentialHash)
        );
        credentials[_credentialHash].accessToken = _newAccessKey;
        credentials[_credentialHash].accessTokenValidUntil =
            block.timestamp +
            5 days;

        emit AccessTokenUpdated(_credentialHash, _newAccessKey);
    }
}
