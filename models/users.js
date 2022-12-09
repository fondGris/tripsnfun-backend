const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
username: String,
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
trips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'trips' }],
});

const User = mongoose.model('users', userSchema);

module.exports = User;