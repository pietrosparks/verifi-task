const mongoose = require('mongoose');
const secrets = require('./secrets');
const dbConnection = mongoose.connection;

mongoose.Promise = global.Promise;
console.log(secrets,"secretess")
mongoose.connect(secrets.DATABASE)

module.exports = {
    connect(){
        dbConnection.on('error', console.error.bind(console, 'Mongoose Encountered an error'));
        dbConnection.once('open',()=>{
            console.log('Connected to VerifiDB');
        })
    }
}