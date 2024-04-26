const chatRouter = require('express').Router();
const ChatController = require('../controllers/chat.controller');

chatRouter.route('/').post(ChatController.createChat).get(ChatController.findChats);
chatRouter
  .route('/:chatId')
  .get(ChatController.findChat)
  .post(ChatController.addChatMessage);

chatRouter.route('/:chatId/messages').get(ChatController.findMessages);

chatRouter.route('/:chatId/users/:userId').put(ChatController.addUser);

module.exports = chatRouter;
