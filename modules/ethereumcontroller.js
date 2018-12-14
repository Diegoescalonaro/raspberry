'use strict';

// Import the interface to Tessel hardware
// const tessel = require('tessel');
const Eth = require('ethjs');
const stringify = require('json-stringify-safe');
const Web3 = require('web3');

var web3 = new Web3(
    new Web3.providers.HttpProvider('https://rinkeby.infura.io/')
);

console.log(web3)


// Turn one of the LEDs on to start.
// console.log(tessel)

// console.log("ETHHH")

//const eth = new Eth(new Eth.HttpProvider('https://kovan.infura.io/v3/901a0582278d4dd880c5e35a7f233cc2'));
// endpoint: https://kovan.infura.io/v3/901a0582278d4dd880c5e35a7f233cc2
// smart contract address: 0x257b195a3c5cd78a1238818ad9baa7ad9f24383a

//exports.eth = eth
// eth.accounts().then(result => {
//   console.log("PROMISEEEEE*******************")
//   console.log(result)
// })
//   .catch(console.log)

var ABI = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "_numberID",
				"type": "uint256"
			}
		],
		"name": "getNecesidadOwner",
		"outputs": [
			{
				"name": "owner",
				"type": "address"
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
				"name": "_numberID",
				"type": "uint256"
			}
		],
		"name": "getNecesidadByID",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "info",
				"type": "string"
			},
			{
				"name": "price",
				"type": "uint256"
			},
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "provider",
				"type": "address"
			},
			{
				"name": "state",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_numberID",
				"type": "uint256"
			},
			{
				"name": "_delete",
				"type": "bool"
			}
		],
		"name": "cancelar",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_info",
				"type": "string"
			},
			{
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "solicitar",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_numberID",
				"type": "uint256"
			}
		],
		"name": "cubrir",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_numberID",
				"type": "uint256"
			}
		],
		"name": "validar",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getLength",
		"outputs": [
			{
				"name": "count",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "info",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "owner",
				"type": "address"
			}
		],
		"name": "NuevaSolicitud",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "info",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "from",
				"type": "address"
			}
		],
		"name": "SolicitudCubierta",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "info",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "owner",
				"type": "address"
			}
		],
		"name": "SolicitudValidada",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "info",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "owner",
				"type": "address"
			}
		],
		"name": "SolicitudCancelada",
		"type": "event"
	}
]
// const token = eth.contract(tokenABI).at('0x257b195a3c5cd78a1238818ad9baa7ad9f24383a');


var MyContract = web3.eth.contract(ABI);
// initiate contract for an address
var contract = MyContract.at('0x257b195a3c5cd78a1238818ad9baa7ad9f24383a');
// call constant function
console.log("************ TOKEN ")
console.log(contract)

exports.contract = contract

console.log("************ contract method ")
console.log(contract.getLength.call())
console.log(contract.getNecesidadByID(0))

// contract.getLength.call()

// token.getLength().then((result)=>{console.log(result.data)}).catch(console.log)
