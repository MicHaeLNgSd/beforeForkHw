const bcrypt = require('bcrypt');
const { User } = require('../models');
const AuthService = require('../services/auth.service');

// 1. - реєстрація користувача
module.exports.registration = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.create(body);

    const sessionData = await AuthService.createSession(user);

    res.status(201).send({ data: sessionData });
  } catch (error) {
    next(error);
  }
};

// 2. - логін користувача
module.exports.login = async (req, res, next) => {
  try {
    // логін / пошта + пароль
    const {
      body: { email, password },
    } = req;

    // 1. знайти користувача
    const user = await User.findOne({ email });

    // одразу повертає чистий js об'єкт замість монгусівського документу
    // const user = await User.findOne({ email }).lean();

    // 1.5 якщо не знайшли користувача то кидаємо помилку
    if (!user) {
      // 404
      throw new Error('user with this data not found');
    }

    // 2. перевірити пароль
    const isSamePassword = await bcrypt.compare(password, user.password);

    if (!isSamePassword) {
      // 404
      throw new Error('user with this data not found');
    }

    const sessionData = await AuthService.createSession(user);

    res.status(201).send({ data: sessionData });
  } catch (error) {
    next(error);
  }
};

// 3. - оновлення сессії
module.exports.refresh = async (req, res, next) => {
  try {
    const { tokenInstanse } = req;

    const sessionData = await AuthService.refreshSession(tokenInstanse);

    res.status(201).send({ data: sessionData });
  } catch (error) {
    next(error);
  }
};
