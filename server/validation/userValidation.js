const yup = require('yup');

const NAME_SCHEMA = yup.string().min(2);

const EMAIL_SCHEMA = yup.string().email();

const PASSWORD_SCHEMA = yup.string().matches(/^[a-zA-Z0-9#$%^&]{4,32}$/, 'password must consists of english letters, numbers and special symbols (#, $, %, ^, &)');

const PASSWORD_REPEAT_SCHEMA = yup.string().oneOf([yup.ref('password'), null], 'password must match');

module.exports.USER_REGISTRATION_SCHEMA = yup.object({
  firstName: NAME_SCHEMA.required(),
  lastName: NAME_SCHEMA.required(),
  email: EMAIL_SCHEMA.required(),
  password: PASSWORD_SCHEMA.required(),
  passwordRepeat: PASSWORD_REPEAT_SCHEMA.required(),
  isMale: yup.bool(),
});

module.exports.USER_LOGIN_SCHEMA = yup.object({
  email: EMAIL_SCHEMA.required(),
  password: PASSWORD_SCHEMA.required(),
});

module.exports.USER_UPDATE_SCHEMA = yup.object({
  firstName: NAME_SCHEMA,
  lastName: NAME_SCHEMA,
  email: EMAIL_SCHEMA,
  password: PASSWORD_SCHEMA,
  passwordRepeat: PASSWORD_REPEAT_SCHEMA,
  isMale: yup.bool(),
});