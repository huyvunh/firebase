var express = require('express');
const app = express()
app.set('trust proxy', 1)

require('./config/enviroment')(app);
require('./app/router/router')(app);

var server = require('http').createServer(app);
let port = 5000;
server.listen(process.env.PORT || port, function () {
    console.log('Server is Running');
});