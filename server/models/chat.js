const { Schema, model } = require('mongoose');
const { ChatMessage } = require('./index');

const chatSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Chat name is required'],
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'ChatMessage' }],
    img: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const Chat = model('Chat', chatSchema);

module.exports = Chat;
