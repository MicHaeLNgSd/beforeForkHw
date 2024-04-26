const { ChatMessage } = require('../models');

module.exports.createChatMessage = async (req, res, next) => {
  try {
    const { body } = req;
    const chatMessage = await ChatMessage.create(body);

    res.status(201).send({ data: chatMessage });
  } catch (error) {
    next(err);
  }
};

module.exports.findChat = async (req, res, next) => {
  try {
    const {
      params: { chatMessageId },
    } = req;
    const chatMessage = await ChatMessage.findOne({ _id: chatMessageId });

    res.status(200).send({ data: chatMessage });
  } catch (error) {
    next(error);
  }
};

module.exports.findChats = async (req, res, next) => {
  try {
    const chatMessages = await ChatMessage.find();

    res.status(200).send({ data: chatMessages });
  } catch (error) {
    next(error);
  }
};
