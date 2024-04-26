const chatMessageRouter = require('express').Router();
const ChatMessageController = require('../controllers/chatMessage.controller');

chatMessageRouter
  .route('/')
  .post(ChatMessageController.createChat)
  .get(ChatMessageController.findChats);
chatMessageRouter.route('/:chatId').get(ChatMessageController.findChat);

module.exports = chatMessageRouter;
