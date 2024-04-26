const { Schema, model } = require('mongoose');
const { User, Chat } = require('./index');

const chatMessageSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Message author is required'],
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
      required: [true, 'Message chat is required'],
    },
    text: { type: String, required: [true, 'Message text is required'] },
  },
  { timestamps: true }
);

const ChatMessage = model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;
