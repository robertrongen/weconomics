// ABI code of SmartysToken.sol
// console.log("ABI = "+JSON.stringify(ABI));

const ABIC=
[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ipfsHash",
				"type": "string"
			},
			{
				"name": "_photographer",
				"type": "string"
			},
			{
				"name": "_photoLocation",
				"type": "string"
			}
		],
		"name": "registerPhoto",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "photoIDs",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "photos",
		"outputs": [
			{
				"name": "photoID",
				"type": "uint256"
			},
			{
				"name": "registrant",
				"type": "address"
			},
			{
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"name": "photographer",
				"type": "string"
			},
			{
				"name": "photoLocation",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "photoID",
				"type": "uint256"
			}
		],
		"name": "newRegistration",
		"type": "event"
	}
];