const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
username: String,
email:String,
password: String,
firstName: String,
lastName: String,
birthdate: Date,
avatar: String,
city: String,
country: String,
languages: [String],
signUpDate: Date,
description: String,
userLocation: String,
token: String,
isConnected: Boolean,
trips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'trips' }],
});

const User = mongoose.model('users', userSchema);

module.exports = User;