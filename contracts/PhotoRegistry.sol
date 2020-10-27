pragma solidity 0.5.12;
pragma experimental ABIEncoderV2;

/// @author Robert Rongen for Weconomics
/// @title Photo Registry

contract PhotoRegistry  {

    /// @param photoID is generated as a unique identifier for the registration
    uint256 photoID;

    /// @param registrant is the address of the account used to register a photo
    /// @param ipfsHash is the IPFS hasn of the photo
    /// @param photographer is the photographer of the photo
    /// @param photoLocation is the location where the photo was taken
    struct PhotoData {
        uint256 photoID;
        address registrant;
        string ipfsHash;
        string photographer;
        string photoLocation;
    }

    mapping (uint256 => PhotoData) public photos;
    uint256[] public photoIDs;

    event newRegistration(uint256 photoID);
    /// @notice registers a photo on the Ethereum blockchain and returns a unique ID
    function registerPhoto(
        string memory _ipfsHash,
        string memory _photographer,
        string memory _photoLocation
    ) public returns(uint256) {
        // set photoID
        photoID++;
        // set parameters
        photos[photoID].photoID = photoID;
        photos[photoID].registrant = msg.sender;
        photos[photoID].ipfsHash = _ipfsHash;
        photos[photoID].photographer = _photographer;
        photos[photoID].photoLocation = _photoLocation;
        // push the new orderId to the array of uints orderIDs
        photoIDs.push(photoID) -1;
        emit newRegistration(photoID);
    }
    
    /// @return Returns the data registered for a specific PhotoID
    function getRegistry(uint256 _photoID) public view returns (PhotoData memory) {
        return photos[photoID];
    }
}
