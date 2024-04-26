const userRouter = require('express').Router();
const UserController = require('../controllers/user.controller');
const ChatController = require('../controllers/chat.controller');
const { checkAccessToken } = require('../middlewares/token.mw');
const { validateUserUpdate } = require('../middlewares/user.mw');

userRouter.route('/').post(UserController.createUser).get(UserController.findUsers);

userRouter
  .route('/:userId')
  .get(UserController.findUser)
  .put(checkAccessToken, validateUserUpdate, UserController.updateUser)
  .delete(checkAccessToken, UserController.deleteUser);

userRouter.route('/:userId/chats').get(ChatController.findChatsOfUser);

module.exports = userRouter;
