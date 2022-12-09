const mongoose = require("mongoose");

const chatRoomSchema = mongoose.Schema({
  expediteurId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  destinataireId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "messages" }],
});

const ChatRoom = mongoose.model("chatRooms", chatRoomSchema);

module.exports = ChatRoom;
