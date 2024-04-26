const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.create(body);

    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.findUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    const user = await User.findOne({ _id: userId });

    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.findUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
      body,
      tokenData: { userId: tokenUserId },
    } = req;

    if (userId !== tokenUserId) {
      throw new Error('Cant change other users');
    }

    const user = await User.findByIdAndUpdate(userId, body, { new: true });

    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    const user = await User.findByIdAndDelete(userId);

    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};
