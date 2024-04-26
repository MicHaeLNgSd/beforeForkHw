const { User, RefreshToken } = require('../models');
const JWTService = require('./jwt.service');
const { prepareUser } = require('../utils/userUtils');

// створення нової сессії для користувача
module.exports.createSession = async (user) => {
  // генеруємо нові токени для користувача
  const accessToken = await JWTService.createAccessToken({
    userId: user._id,
  });

  const refreshToken = await JWTService.createRefreshToken({
    userId: user._id,
  });

  // зберігаємо рефреш токен у БД
  await RefreshToken.create({ userId: user._id, token: refreshToken });

  // 4. видаляємо пароль у користувача
  const userWithoutPassword = prepareUser(user);

  // повертаю з функції об'єкт який можна відправити на фронт одразу
  return {
    user: userWithoutPassword,
    tokenPair: { accessToken, refreshToken },
  };
};

// оновлення існуючої сессії користувача
module.exports.refreshSession = async (tokenInstanse) => {
  // шукаємо пов'язаного з валідним токном користувача
  const user = await User.findById(tokenInstanse.userId);

  if (!user) {
    throw new Error('User not found');
  }

  // генеруємо нові токени для користувача
  const accessToken = await JWTService.createAccessToken({
    userId: user._id,
  });

  const refreshToken = await JWTService.createRefreshToken({
    userId: user._id,
  });

  // міняємо запис зі старим токеном у БД на новий
  await RefreshToken.findOneAndUpdate(
    { token: tokenInstanse.token },
    { token: refreshToken }
  );

  const userWithoutPassword = prepareUser(user);

  // повертаю з функції об'єкт який можна відправити на фронт одразу
  return {
    user: userWithoutPassword,
    tokenPair: { accessToken, refreshToken },
  };
};
