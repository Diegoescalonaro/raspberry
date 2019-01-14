/* Initial file */
var config = require('./config')
var ethController = require('./modules/ethereumcontroller')
var stockController = require('./modules/stockcontroller')

exports.ethController = ethController
exports.stockController = stockController


var wpi = require('node-wiring-pi');

wpi.setup("wpi")
wpi.pinMode(7, wpi.INPUT);

setInterval(function () {
if(wpi.digitalRead(7) == 1) console.log("PULSADO")


},1000)

