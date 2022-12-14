const mongoose = require('mongoose');

// const connectionString = process.env.CONNECTION_STRING;
const connectionString = "mongodb+srv://admin:iFPu8y8B6Ca1K22C@atlascluster.rtt2tcs.mongodb.net/tripsnfun"
mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));

module.exports = connectionString;
