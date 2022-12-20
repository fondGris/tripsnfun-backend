const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
username: String,
email:String,
password: String,
firstname: String,
lastname: String,
birthdate: Date,
avatar: String,
city: String,
country: String,
languages: [String],
signUpDate: Date,
description: String,
hobbies: String,
userLocation: [{String}],
token: String, 
isConnected: Boolean,
trips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'trips' }],
});

const User = mongoose.model('users', userSchema);

module.exports = User;