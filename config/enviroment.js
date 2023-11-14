var bodyParser = require('body-parser');
const express = require('express');

module.exports = function(app){
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
};