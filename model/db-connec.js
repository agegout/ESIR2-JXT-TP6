
const mongoose = require('mongoose');


// Use native promises fo mongoose
mongoose.Promise = global.Promise;

//configuration de connexion la la bdd
const config = require('config');
const dbConfig = config.get('db');

// Build the connection string
const uri = `mongodb://${dbConfig.user}:${dbConfig.pwd}@${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`;

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
    checkDB,
    openDB
};