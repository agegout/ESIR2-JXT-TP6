
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
    try {
        await mongoose.connect(uri);
        console.log("connected to the db with the default connection");
        await mongoose.connection
    } catch (error) {
        console.error(error)
        const errorConnect = new Error("failed to connect to the db server")
        errorConnect.code = "ECONNECT"
        throw errorConnect
    }
    
};

const checkDB = async () => {
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) return Promise.resolve();
    try{
        return openDB();
    }
    catch (err) {
        console.log(`Mongo error: ${err && err.message && JSON.stringify(err) || err}`);
        const errorConnect = new Error("failed to connect to the db server")
        errorConnect.code = "ECONNECT"
        throw errorConnect
    }
};

module.exports = {
    uri,
    checkDB,
    openDB
};