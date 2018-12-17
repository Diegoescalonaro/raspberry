'use strict';

const Web3 = require('web3');
const ABI = require('./ABI').ABI;
const secret = require('/home/pi/.ethereum/rinkeby/notimportant.js').secret

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
web3.eth.getAccounts().then(result => {
    web3.eth.defaultAccount = result[0]
    console.log("Default Account in use:  " + web3.eth.defaultAccount)
})

exports.web3 = web3

// smart contract address (KOVAN): 0x257b195a3c5cd78a1238818ad9baa7ad9f24383a
// smart contract addres (RINKEBY): 0x96d1374d24d90faeb11413365d28482a26c63791
var contract = new web3.eth.Contract(ABI, '0x96d1374d24d90faeb11413365d28482a26c63791')
exports.contract = contract
console.log("Smart contract loaded: " + contract._address)


/**
 * @function getSolicitudByID
 * @param {Number} numberID
 * @description 
 * @returns {Promise}
 */
var getSolicitudByID = async function (numberID) {
    console.log(numberID)
    var result = await contract.methods.getNecesidadByID(numberID).call()
    console.log(({ info: result['info'], owner: result['owner'], provider: result['provider'] }))
    return ({ info: result['info'], owner: result['owner'], provider: result['provider'] })
}
exports.getSolicitudByID = getSolicitudByID

/**
 * @function solicitar
 * @param  {String} info
 * @param  {Number} price
 * @description 
 * @returns {Promise}
 */
function solicitar(info, price) {
    var thePromise = new Promise((resolve, reject) => {
        if (contract == undefined)
            resolve("You must instantiate the contract.")
        else {
            web3.eth.personal.unlockAccount(web3.eth.defaultAccount, secret).then(result => {
                if (result == true) {
                    contract.methods.solicitar(info, price).send({ from: web3.eth.defaultAccount, gas: 348560 })
                        .then(res => {
                            resolve(res.transactionHash)
                        })
                        .catch(error => {
                            reject(error.message)
                        })
                } else {
                    resolve("Authentication error")
                }
            })
        }
    })
    return thePromise
}
exports.solicitar = solicitar


/**
 * @function validar
 * @param numberID {Number}
 * @description 
 * @returns {Promise}
 */
exports.validar = function (numberID) {
    let thePromise = new Promise((resolve, reject) => {
        web3.eth.personal.unlockAccount(web3.eth.defaultAccount, secret).then(result => {
            if (result) {
                trContract.methods.validar(numberID).send({ from: web3.eth.defaultAccount, gas: 348560 })
                    .then(res => {
                        resolve(res.transactionHash)
                    })
                    .catch(err => {
                        reject(err.message)
                    })
            } else {
                resolve("Authentication error")
            }
        })
    })
    return thePromise
}

exports.validar = validar