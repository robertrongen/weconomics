pragma solidity 0.5.12;
pragma experimental ABIEncoderV2;

import "truffle/Assert.sol";
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "../contracts/PhotoRegistry.sol"; // this import is automatically injected by Remix.

// file name has to end with '_test.sol'
contract PhotoRegistry_test {

    PhotoRegistry PR;

    function beforeAll() public {
        // here should instantiate tested contract
        PR = new PhotoRegistry();
        // assert.isEmpty(PR.photoIDs, "photoID should be empty");
        // registrant = msg.sender; How to get msg.sender in test
    }

    function registerOnePhoto() public {
        // use 'Assert' to test the contract
        PR.registerPhoto(
            "QmdCntgXiAotyTBR1v3CeNUoRNtVc3Gu3ScneCA4Zr9iWX", 
            "Tester", 
            "Test Location");
        PhotoRegistry.PhotoData memory registeredPhotos = PR.getRegistry(1);

        uint256 photoID;
        address registrant;
        string memory ipfsHash;
        string memory photographer;
        string memory photoLocation;

        (photoID,registrant,ipfsHash,photographer,photoLocation) = PR.photos(1);
        Assert.equal(registeredPhotos.photoID, 1, "PhotoID should be 1 now");
        // Assert.equal(PR.photos(1).registrant, msg.sender, "Registrant should be msg.sender now");
        Assert.equal(registeredPhotos.ipfsHash, "QmdCntgXiAotyTBR1v3CeNUoRNtVc3Gu3ScneCA4Zr9iWX", "ipfsHash should be QmdCntgXiAotyTBR1v3CeNUoRNtVc3Gu3ScneCA4Zr9iWX now");
        Assert.equal(registeredPhotos.photographer, "Tester", "photographer should be Tester now");
        Assert.equal(registeredPhotos.photoLocation, "Test Location", "photoLocation should be Test Location now");
    }

}