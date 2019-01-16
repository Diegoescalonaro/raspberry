/* Initial file */
var config = require('./config')

console.log("Nodo GETH light en ejecucion")

var ethController = require('./modules/ethereumcontroller')
var stockController = require('./modules/stockcontroller')

exports.ethController = ethController
exports.stockController = stockController

console.log("Controlando el Stock de productos desde RaspberryPi")

var wpi = require('node-wiring-pi');

wpi.setup("wpi")
wpi.pinMode(7, wpi.INPUT);

setInterval(function () {

if(wpi.digitalRead(7) == 0) {
    console.log("* * * Nueva solicitud de producto desde RaspberryPi * * *")
    ethController.solicitar("Producto [X] desde RaspberryPi", 1230000000000000).then(console.log).catch(console.log)
}
},1000)

