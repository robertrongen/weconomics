pragma solidity>0.4.99<0.6.0;

/// @author udy Dries for Weconomics
/// @title DogChain

contract DogChain  {

    uint256 dogID;

    struct dogData{
        uint256 dogID;
        address registrant;
        string ipfsHash;
        string pedigree;
        string vaccins;
        string hereditary_defect;
        string dapinfo;
    }

    mapping (uint256 => dogData) public dogs;
    uint256[] public dogIDs;

    event newRegistration(uint256 dogID);
    function registerdog(
        string memory _ipfsHash,
        string memory _pedigree,
        string memory _vaccins,
        string memory _hereditary_defect,
        string memory _dapinfo
    ) public returns(uint256) {
        // set dogID
        dogID++;
        // set parameters
        dogs[dogID].dogID = dogID;
        dogs[dogID].ipfsHash = _ipfsHash;
        dogs[dogID].pedigree = _pedigree;
        dogs[dogID].vaccins = _vaccins;
        dogs[dogID].hereditary_defect = _hereditary_defect;
        dogs[dogID].dapinfo = _dapinfo;
        // push the new orderId to the array of uints orderIDs
        dogIDs.push(dogID) -1;
        emit newRegistration(dogID);
    }
}
