const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
expediteurId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
date: Date,
message: String,
isRead : Boolean,
});

const Message = mongoose.model('messages', messageSchema);

module.exports = Message;