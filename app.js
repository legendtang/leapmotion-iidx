var HTTP = require('http');
var server = require('./modules/server');
var CONFIG = require('./config');

HTTP.createServer(server).listen( CONFIG.port, CONFIG.host );

console.log( 'Site Online : http://' + CONFIG.host + ':' + CONFIG.port.toString() + '/' );