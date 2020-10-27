// set language format variables
numeral.locale('en');
// set variables for metadata
var photoFile;
var photographer;
var photoLocation;
// set variables for hashes
var ipfsHash = "";
var registryHash = "";
var photoID;

// variables for configuring Web3
// Chain ID of Rinkeby Test Net is 4, replace it to 1 for Main Net, to 3 for Ropsten Test Net
const chainId = 4;
let link ="https://rinkeby.etherscan.io/address/";
let txlink = "https://rinkeby.etherscan.io/tx/";

var addressOwner = "0x37c05c75c376B34bf461EBBFF163C902e42e3735"; // Admin account
var contractAddress = "0x61116d2B5ACb2923dCbD7C2B9CFa9C36bfC7cBB3";