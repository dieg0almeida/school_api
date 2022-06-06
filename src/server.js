require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const server = express();

const routes = require('./routes');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true}));

server.use(routes);

server.listen(5000, function () {
    console.log("Server is running!");
});