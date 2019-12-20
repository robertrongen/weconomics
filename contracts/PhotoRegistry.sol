pragma solidity>0.4.99<0.6.0;

/// @author Robert Rongen for Weconomics
/// @title Photo Registry

contract PhotoRegistry  {

    uint256 photoID;

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
}
