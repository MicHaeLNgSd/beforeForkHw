const JWTService = require('../services/jwt.service');
const { RefreshToken } = require('../models');

module.exports.checkAccessToken = async (req, res, next) => {
  try {
    // токени доступу передають у заголовку Authorization
    // зазвичай у вигляді рядка 'Bearer bdj33.3443.2345435'
    const {
      headers: { authorization },
    } = req;

    // 1. перевіяємо наявність токену доступу
    if (!authorization) {
      throw new Error('Access token required');
    }

    // 2. треба перевірити токен
    const [tokenType, accessToken ] = authorization.split(' ');
    
    const tokenData = await JWTService.verifyAccessToken(accessToken);

    req.tokenData = tokenData;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports.checkRefreshToken = async (req, res, next) => {
  try {
    // з фронта нам надсилають токен користувача, сессію якого треба оновити
    const {
      body: { token },
    } = req;

    // перевіряємо токен на валідність
    const { userId } = await JWTService.verifyRefreshToken(token);

    // перевіряємо що токен зроблений нашим сервером
    const tokenInstanse = await RefreshToken.findOne({ token, userId });

    if (!tokenInstanse) {
      throw new Error('Token not found');
    }

    req.tokenInstanse = tokenInstanse;

    next();
  } catch (error) {
    next(error);
  }
};
