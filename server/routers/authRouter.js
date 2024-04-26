const authRouter = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const { checkRefreshToken } = require('../middlewares/token.mw');
const {
  validateLogin,
  validateRegistration,
} = require('../middlewares/user.mw');

authRouter.post(
  '/registration',
  validateRegistration,
  AuthController.registration
);
authRouter.post('/login', validateLogin, AuthController.login);

authRouter.post('/refresh', checkRefreshToken, AuthController.refresh);

module.exports = authRouter;
