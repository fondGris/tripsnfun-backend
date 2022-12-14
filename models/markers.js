const mongoose = require('mongoose');

const markerSchema = mongoose.Schema({
  userName: String,
  city: String,
  latitude: Number,
  longitude: Number,
  token: String,
});

const Marker = mongoose.model('markers', markerSchema);

module.exports = Marker;