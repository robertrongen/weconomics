// send photo data to smart contract
// Disable auto-refresh on a network change.
ethereum.autoRefreshOnNetworkChange = false;

// Code from https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
window.web3 = new Web3(ethereum);
var version = web3.version;
console.log(`web3Version = ${version}`);
ethereum.enable();

async function sendDataToContract () {
    console.log("sendDataToContract function started");
    document.getElementById("registryHash").innerHTML = `<em>*** Wait for transaction hash to appear here ***</em>`;
    document.getElementById("photoID").innerHTML = `<em>*** Wait for registration ID to appear here ***</em>`;

    // set photo variables
    // var _ipfsHex = web3.utils.toHex(ipfsHash);
    var _ipfsHex = ipfsHash;
    console.log(`_ipfsHex = ${_ipfsHex}`);
    photographer = document.getElementById("photographerId").value;
    console.log(`photographer = ${photographer}`);
    photoLocation = document.getElementById("locationId").value;
    console.log(`photoLocation = ${photoLocation}`);

    // Set from account
    var acts = await web3.eth.getAccounts();
    var fromAddress = acts[0];
    console.log(`fromAddress: ${fromAddress}`);

    const photoRegistryContract = new web3.eth.Contract(ABIC, contractAddress);
    var _transactionLog = await photoRegistryContract.methods.registerPhoto(_ipfsHex, photographer, photoLocation)
        .send({from: fromAddress})
        .on('transactionHash', function(hash) {
            console.log(`createOrderHash: ${hash}`);
            document.getElementById("registryHash").innerHTML = `Transaction hash:&nbsp;<strong><a href="${txlink}${hash}" target="_blank" rel="noopener noreferrer">${hash}</strong></a><br>`;
        })
        var _transactionJSON = JSON.stringify(_transactionLog);
        console.log(`transactionJSON: ${_transactionJSON}`);
        photoID = _transactionLog.events.newRegistration.returnValues.photoID;
        document.getElementById("photoID").innerHTML = `photoID: <strong>${photoID}</strong>`;
        console.log(`registryID: ${photoID}`);
    }

// Store order on IPFS
// Code from https://github.com/web3examples/ipfs/blob/master/browser_examples/ipfs_add_infura.html
async function sendFileToIpfs () {
    console.log(`sendFileToIpfs function started`);
    document.getElementById("ipfsHash").innerHTML = "<em>*** Wait for IPFS hash to appear here ***</em>";
    const file = document.getElementById('fileId').files[0];
    const reader = new FileReader();
    reader.onload = async function () {
        const Buffer=window.buffer.Buffer;
        var toStore = new Buffer(reader.result);
        const ipfs = window.IpfsHttpClient({ host: "ipfs.infura.io", port: 5001, protocol: "https", timeout: '1m' });
        await ipfs.add(toStore, function (err, res) {
            if (err || !res) {
                console.error('ipfs add error', err, res);
                document.getElementById("ipfsHash").innerHTML = "<strong>!!! Ipfs error, retry to upload photo !!!</strong>";
            } else {
                ipfsHash = res[0].hash;
                console.log(`result = ${JSON.stringify(res)}`);
                console.log(`ipfsHash = ${ipfsHash}`);
                document.getElementById("ipfsHash").innerHTML = `IPFS Hash: <strong><a href="https://ipfs.io/ipfs/${ipfsHash}" target="_blank">${ipfsHash}</a></strong>`;
            }
            res.forEach(function (file) {
                console.log('successfully stored', file);
            })
        })
    }
    reader.readAsArrayBuffer(file);
}
  
async function getRegistryData() {
    console.log("getRegistryData function started");

}


