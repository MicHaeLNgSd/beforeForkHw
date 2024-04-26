const { USER_LOGIN_SCHEMA, USER_REGISTRATION_SCHEMA, USER_UPDATE_SCHEMA } = require("../validation/userValidation");

module.exports.validateLogin = async (req, res, next) => {
  try {
    const { body } = req;

    await USER_LOGIN_SCHEMA.validate(body);
    
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.validateRegistration = async (req, res, next) => {
  try {
    const { body } = req;

    await USER_REGISTRATION_SCHEMA.validate(body);
    
    next();
  } catch (error) {
    next(error);
  }
};


module.exports.validateUserUpdate = async (req, res, next) => {
  try {
    const { body } = req;

    await USER_UPDATE_SCHEMA.validate(body);
    
    next();
  } catch (error) {
    next(error);
  }
};

