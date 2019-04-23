
const mongoose = require('mongoose');


// Use native promises fo mongoose
mongoose.Promise = global.Promise;

//configuration de connexion la la bdd

const db_user = 'TP6_JXT_USER'
const db_pwd = 'TP6_JXT_PWD'
const db_port = 27017
const db_host = 'localhost'
const db_name = 'TP6_JXT_DB'


const options = {
  //autoIndex: false, // Don't build indexes
  //reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  //reconnectInterval: 500, // Reconnect every 500ms
  //poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  //bufferMaxEntries: 0
};

// Build the connection string
const uri = `mongodb://${db_user}:${db_pwd}@${db_host}:${db_port}/${db_name}`;

const disconnectHandler = () => {
    console.log('Mongoose default connection disconnected');
};

const openDB = async () => {
    console.log(`connecting to db ${uri}`);
    await mongoose.connect(uri, options);
    debugLog("connected to the db with the default connection");
    await mongoose.connection
        .removeListener('error', errorHandler)
        .on('error', errorHandler) // If the connection throws an error
        .removeListener('disconnected', disconnectHandler)
        .on('disconnected', disconnectHandler);// When the connection is disconnected
};

const checkDB = async () => {
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) return Promise.resolve();
    try{
        return openDB();
    }
    catch (err) {
        console.log(`Mongo error: ${err && err.message && JSON.stringify(err) || err}`);
        throw new createError.ServiceUnavailable("failed to connect to the db server");
    }
};

module.exports = {
    uri,
    options,
    checkDB,
    openDB,
};