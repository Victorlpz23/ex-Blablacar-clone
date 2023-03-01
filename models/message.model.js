// Require mongoose to create a schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating a message schema
const messageSchema = new Schema ({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
    required: true
  },
});

// Export the model to use in the app
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;