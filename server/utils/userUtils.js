const _ = require('lodash');

module.exports.prepareUser = (user) => {

  const userWithoutPassword = _.omit(user.toObject(), ['password', '__v']);

  return userWithoutPassword;

};
