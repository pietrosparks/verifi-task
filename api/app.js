const express = require('express');
const app = express();
const api = express.Router();
const server = require('http').Server(app)
const database = require('./dbConfig/database');
const secrets = require('./dbConfig/secrets')

database.connect()

require('./configuration')(app, express);

module.exports = {
    app,
    server
}