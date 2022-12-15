const mongoose = require('mongoose');

const markerSchema = mongoose.Schema({
  username: String,
  latitude: Number,
  longitude: Number,
  token: String,
  isConnected: Boolean,
});

const Marker = mongoose.model('markers', markerSchema);

module.exports = Marker;