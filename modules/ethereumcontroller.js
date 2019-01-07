'use strict';

const config = require('../config').config
const Web3 = require('web3')
const ABI = require('./ABI').ABI
const secret = require('/home/pi/.ethereum/rinkeby/notimportant.js').secret

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
exports.web3 = web3

var contract = new web3.eth.Contract(ABI, config.smartcontractaddress)
exports.contract = contract


web3.eth.getAccounts().then(result => {
    web3.eth.defaultAccount = result[0]
    console.log("Default Account in use:  " + web3.eth.defaultAccount)
    console.log("Smart contract loaded: " + contract._address)
})




/**
 * @function getSolicitudByID
 * @param {Number} numberID
 * @description 
 * @returns {Promise}
 */
var getSolicitudByID = async function (numberID) {
    var result = await contract.methods.getNecesidadByID(numberID).call()
    console.log(({ producto: result['producto'], owner: result['owner'], proveedor: result['proveedor'] }))
    return ({ producto: result['producto'], owner: result['owner'], proveedor: result['proveedor'] })
}
exports.getSolicitudByID = getSolicitudByID

/**
 * @function solicitar
 * @param  {String} info
 * @param  {Number} price
 * @description 
 * @returns {Promise}
 */
function solicitar(producto, price) {
    var thePromise = new Promise((resolve, reject) => {
        if (contract == undefined)
            resolve("You must instantiate the contract.")
        else {
            web3.eth.personal.unlockAccount(web3.eth.defaultAccount, secret).then(result => {
                if (result == true) {
                    contract.methods.solicitar(producto, price).send({ from: web3.eth.defaultAccount, gas: 548560 })
                        .then(res => { resolve(res.transactionHash) })
                        .catch(error => { reject(error.message) })
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
function validar(numberID) {
    let thePromise = new Promise((resolve, reject) => {
        web3.eth.personal.unlockAccount(web3.eth.defaultAccount, secret).then(result => {
            if (result) {
                trContract.methods.validar(numberID).send({ from: web3.eth.defaultAccount, gas: 548560 })
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
