const mongoose = require('mongoose');

const stepSchema = mongoose.Schema({
    city: String,
    mainPhoto: String,
    description: String,
    startDate: Date,
    endDate: Date,
    markers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'markers' }],
    allPhotos: [String],
});

const Step = mongoose.model('steps', stepSchema);

module.exports = Step;

 