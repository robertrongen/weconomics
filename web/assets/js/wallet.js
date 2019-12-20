var orderData = ["Order ID", "Client", "Order Amount", "IPFS Hash", "Escrow Paid", "Goods Received", "Transport Ended"];
async function getOrderData(_orderID) {
    console.log("getOrderData function started");

    // get data from smart contract
    ethereum.enable();
    const orderContract = new web3.eth.Contract(ABIC, contractAddress);
    
    var order = await orderContract.methods.orders(_orderID).call(); 
    orderData = [_orderID, order[1], (order[2]/(10**tokenDecimal)), order[3], order[4], order[5], order[6]];
    console.log(`orderData: ${JSON.stringify(orderData)}`);
    /*
        0: address: supplier 0x60f315FF19b3303cD67fC298BFa4f9cD2B416997
        1: address: client 0xfA817bD1c470F5E83367975Ec24F885F305AdE34
        2: uint256: orderAmount 24
        3: string: ipfsOrderHash
        4: bool: escrowPaid false
        5: bool: goodsReceived false
        6: bool: ended false
    */
}

var orderKeystore;
async function showOrderData() {
    console.log("showOrderData function started");

    await getOrderData(orderID);
    console.log(`orderData returned: ${JSON.stringify(orderData)}`);

    var orderingCompanyAddress = orderData[1].toLowerCase();
    console.log(`orderingCompanyAddress: ${orderingCompanyAddress}`);
    var i=0, j=false;
    while ( (j === false) && (i < 10) ) {
        if (orderingCompanyAddress === ("0x"+keystores[i]["address"])) {
            orderKeystore = keystores[i];
            j=true;
        } else {
            i++;
        };
        console.log(`orderKeystore: ${JSON.stringify(orderKeystore)}`);
    }

    orderIPFSHash = orderData[3];
    console.log(`orderIPFSHash: ${JSON.stringify(orderIPFSHash)}`);
    getFromIPFS(orderIPFSHash);
}

showOrderData();

document.getElementById("releasePaymentClass").className='primary';
async function releasePayment() {
    console.log("releasePayment function started");
    document.getElementById("releasePaymentClass").className='';

    var password = document.getElementById("tPassword").value;
    document.getElementById("tPassword").value='';

    releasePaymentHash = "releasePaymentHash";

    // From https://medium.com/coinmonks/signing-and-making-transactions-on-ethereum-using-web3-js-1b5663207d63
    // Create keystore file: https://github.com/ethereum/go-ethereum/wiki/Managing-your-accounts
    // connect to any peer; using infura here
    const web3 = new Web3(
        new Web3.providers.HttpProvider (
            "https://rinkeby.infura.io/v3/1c5e57a82ddb432cb37bbea2d4549cfe", {
                headers: [{
                    name: 'Access-Control-Allow-Origin',
                    value: 'https://rinkeby.infura.io/v3/key'
                }]
            }
        )
    );
    // contents of keystore file, can do a fs read
    const decryptedAccount = web3.eth.accounts.decrypt(orderKeystore, password);
    console.log(`decryptedAccount.address: ${decryptedAccount.address}`);
    const rawTransaction = {
        "from": decryptedAccount.address, /* "0xfA817bD1c470F5E83367975Ec24F885F305AdE34" */
        "to": "0x88E640aA87296ebB3A92AB1E50D43f06C2940582",  /* contractAddress */
        "value": web3.utils.toHex(web3.utils.toWei("0.001", "ether")),
        "gas": 50000,
        "chainId": 4 // Rinkeby testnet
    };
    await decryptedAccount.signTransaction(rawTransaction)
    .then(signedTx => web3.eth.sendSignedTransaction(signedTx.rawTransaction))
/*    .then(signedTx => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        document.getElementById("releasePaymentHash").innerHTML = "transaction is pending confirmation";
    })
*/  .then(receipt => {
        console.log("Transaction receipt: ", receipt); 
        transactionReceipt = receipt; 
        console.log(`Transaction receipt: ${transactionReceipt["transactionHash"]}`);
        document.getElementById("releasePaymentHash").innerHTML = `Etherscan:&nbsp;<a href="${txlink}${transactionReceipt["transactionHash"]}" target="_blank" rel="noopener noreferrer">${transactionReceipt["transactionHash"]}</a><br>`;
        document.getElementById("releasePaymentClass").className='primary';
    })
    .catch(err => console.error(err));
}

