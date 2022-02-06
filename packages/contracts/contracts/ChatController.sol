// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract ChatController is ERC721, ERC721URIStorage, VRFConsumerBase {
    uint256 public controllerCount;
    // add other things
    event createdController(uint256 controllerId);
    event MessageCreated(
        bytes32 indexed messageId,
        address indexed messageOwner,
        bytes32 indexed parentId,
        bytes32 contentId,
        bytes32 sessionId
    );
    event ContentAdded(bytes32 indexed contentId, string contentUri);
    event SessionCreated(bytes32 indexed sessionId, address user);

    mapping(bytes32 => address) sessionRegistry;
    mapping(bytes32 => string) contentRegistry;
    mapping(bytes32 => message) messageRegistry;
    mapping(bytes32 => address) verificationRegistry;
    mapping(bytes32 => bool) isVerified;

    struct message {
        address messageOwner;
        bytes32 parentMessage;
        bytes32 contentId;
        bytes32 sessionId;
    }

    bytes32 internal keyHash;
    uint256 internal fee;

    constructor(
        address _VRFCoordinator,
        address _LinkToken,
        bytes32 _keyhash,
        uint256 _fee
    )
        public
        VRFConsumerBase(_VRFCoordinator, _LinkToken)
        ERC721("Web3ChatService", "W3C")
    {
        controllerCount = 0;
        keyHash = _keyhash;
        fee = _fee;
    }

    function createController(string memory _tokenURI)
        public
        returns (uint256)
    {
        uint256 newItemId = controllerCount;
        _safeMint(msg.sender, newItemId);
        setTokenURI(newItemId, _tokenURI);
        controllerCount = controllerCount + 1;
        emit createdController(newItemId);
        return newItemId;
    }

    function createMessage(
        bytes32 _parentId,
        string calldata _contentUri,
        bytes32 _sessionId
    ) external returns (bytes32) {
        address _owner = msg.sender;
        bytes32 _contentId = keccak256(abi.encode(_contentUri));
        bytes32 _messageId = requestRandomness(keyHash, fee);
        verificationRegistry[_messageId] = msg.sender;
        contentRegistry[_contentId] = _contentUri;
        messageRegistry[_messageId].messageOwner = _owner;
        messageRegistry[_messageId].parentMessage = _parentId;
        messageRegistry[_messageId].contentId = _contentId;
        messageRegistry[_messageId].sessionId = _sessionId;
        emit ContentAdded(_contentId, _contentUri);
        emit MessageCreated(
            _messageId,
            _owner,
            _parentId,
            _contentId,
            _sessionId
        );
        return _messageId;
    }

    function addSession() external returns (bytes32) {
        address _user = msg.sender;
        bytes32 _sessionId = keccak256(abi.encode(_user));
        sessionRegistry[_sessionId] = _user;
        emit SessionCreated(_sessionId, _user);
        return _sessionId;
    }

    function getContent(bytes32 _contentId)
        public
        view
        returns (string memory)
    {
        return contentRegistry[_contentId];
    }

    function getSession(bytes32 _sessionId) public view returns (address) {
        return sessionRegistry[_sessionId];
    }

    function getMessage(bytes32 _messageId)
        public
        view
        returns (
            address,
            bytes32,
            bytes32,
            bytes32
        )
    {
        return (
            messageRegistry[_messageId].messageOwner,
            messageRegistry[_messageId].parentMessage,
            messageRegistry[_messageId].contentId,
            messageRegistry[_messageId].sessionId
        );
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness)
        internal
        override
    {
        isVerified[requestId] = true;
    }

    function verify(bytes32 _messageId)
        public
        view
        returns (string memory, address)
    {
        require(
            isVerified[_messageId],
            "unknown sender- messagge is not verified"
        );
        return ("message was sent by ", verificationRegistry[_messageId]);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _setTokenURI(tokenId, _tokenURI);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
