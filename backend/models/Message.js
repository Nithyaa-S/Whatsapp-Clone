const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  wa_id: String,
  name: String,
  number: String,
  message: String,
  timestamp: Date,
  status: String,
  message_id: String,
  meta_msg_id: String,
});

// 👇 Force collection name to be 'processed_messages'
module.exports = mongoose.model('Message', MessageSchema, 'processed_messages');
