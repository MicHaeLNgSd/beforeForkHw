const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const CONSTANTS = require('../constants');

// промісіфіковані версіі функцій ї бібілотеки
const jwtSign = promisify(jwt.sign);
const jwtVerify = promisify(jwt.verify);

const tokenConfig = {
  access: {
    secret: CONSTANTS.ACCESS_TOKEN_SECRET,
    expiresIn: CONSTANTS.ACCESS_TOKEN_EXPIRES_IN
  },
  refresh: {
    secret: CONSTANTS.REFRESH_TOKEN_SECRET,
    expiresIn: CONSTANTS.REFRESH_TOKEN_EXPIRES_IN
  },
}

/**
 * функція генерації токенів
 * @param {object} payload - дані які будуть у токені
 * @param {object} option - налаштування токену
 * @param {string} option.secret - секрет для генерації токену
 * @param {string | number} option.expiresIn - час життя токену
 * @returns {Promise<string>}
 */
const createToken = (payload, { secret, expiresIn }) =>
  jwtSign(payload, secret, {
    expiresIn,
  });

/**
 * функція перевірки токенів
 * @param {string} token - JWT у вигляді рядка
 * @param {object} option - налаштування токену
 * @param {string} option.secret - секрет для генерації токену
 * @returns {object} - корисне навантаженя відвалідованого токена
 */
const verifyToken = (token, { secret }) => jwtVerify(token, secret);

// accessToken - токен доступу, використовується для авторизації власника
module.exports.createAccessToken = (payload) => createToken(payload, tokenConfig.access);

module.exports.verifyAccessToken = (token) => verifyToken(token, tokenConfig.access);

// refreshToken - одноразовий токен оновлення, існує для отримання свіжого accessToken
module.exports.createRefreshToken = (payload) => createToken(payload, tokenConfig.refresh);

module.exports.verifyRefreshToken = (token) => verifyToken(token, tokenConfig.refresh);
