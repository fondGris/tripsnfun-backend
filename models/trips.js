const mongoose = require("mongoose");

const tripSchema = mongoose.Schema({
  country: String,
  mainPhoto: String,
  description: String,
  steps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'steps' }],
  startDate: Date,
  endDate: Date,
});

const Trip = mongoose.model("trips", tripSchema);

module.exports = Trip;
