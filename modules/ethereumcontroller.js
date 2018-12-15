'use strict';

const Web3 = require('web3');
const ABI = require('./ABI').ABI;

var web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:8545")
);
web3.eth.defaultAccount = web3.eth.accounts[0]

exports.web3 = web3
//const eth = new Eth(new Eth.HttpProvider('https://kovan.infura.io/v3/901a0582278d4dd880c5e35a7f233cc2'));
// endpoint: https://kovan.infura.io/v3/901a0582278d4dd880c5e35a7f233cc2
// smart contract address (KOVAN): 0x257b195a3c5cd78a1238818ad9baa7ad9f24383a
// smart contract addres (RINKEBY): 0x96d1374d24d90faeb11413365d28482a26c63791
var contract = new web3.eth.Contract(ABI, '0x96d1374d24d90faeb11413365d28482a26c63791')

console.log("************ SMART CONTRACT *************************")
// console.log(contract)

exports.contract = contract

console.log("************ contract method ************************")

var getSolicitudByID = async function (numberID) {
    console.log(numberID)
    var result = await contract.methods.getNecesidadByID(numberID).call()
    console.log( { info: result['info'], owner: result['owner'], provider: result['provider'] })
}

getSolicitudByID(0)

console.log(web3.eth.defaultAccount)
