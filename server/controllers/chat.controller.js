const { Chat, User, ChatMessage } = require('../models');

module.exports.createChat = async (req, res, next) => {
  try {
    const {
      body: { authorId, ...body },
    } = req;
    const chat = await Chat.create(body);

    const updatedChat = await Chat.findOneAndUpdate(
      { _id: chat._id },
      { $addToSet: { users: authorId } },
      { new: true }
    ).populate('users');

    res.status(201).send({ data: updatedChat });
  } catch (error) {
    next(err);
  }
};

module.exports.findChat = async (req, res, next) => {
  try {
    const {
      params: { chatId },
    } = req;
    const chat = await Chat.findOne({ _id: chatId }).populate('users');

    res.status(200).send({ data: chat });
  } catch (error) {
    next(error);
  }
};

module.exports.findMessages = async (req, res, next) => {
  try {
    const {
      params: { chatId },
    } = req;
    const chat = await Chat.findOne({ _id: chatId })
      .select('messages')
      .populate('messages');

    res.status(200).send({ data: chat });
  } catch (error) {
    next(error);
  }
};

module.exports.findChats = async (req, res, next) => {
  try {
    const chats = await Chat.find().populate(
      'users',
      '-__v -password -createdAt -updatedAt'
    );

    res.status(200).send({ data: chats });
  } catch (error) {
    next(error);
  }
};

module.exports.findChatsOfUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    const chats = await Chat.find({ users: userId }).select('-users -__v -messages');

    res.status(200).send({ data: chats });
  } catch (error) {
    next(error);
  }
};

module.exports.addUser = async (req, res, next) => {
  try {
    const {
      params: { chatId, userId },
    } = req;
    const updatedChat = await Chat.findOneAndUpdate(
      { _id: chatId },
      { $addToSet: { users: userId } }
    );

    res.status(200).send({ data: updatedChat });
  } catch (error) {
    next(error);
  }
};

module.exports.addChatMessage = async (req, res, next) => {
  try {
    const {
      body,
      params: { chatId },
    } = req;

    const createdMessage = await ChatMessage.create({ ...body, chat: chatId });

    const updatedChat = await Chat.findOneAndUpdate(
      { _id: chatId },
      { $addToSet: { messages: createdMessage._id } },
      { new: true }
    ).populate('messages');

    res.status(200).send({ data: updatedChat });
  } catch (error) {
    next(error);
  }
};

// module.exports.updateUser = async (req, res, next) => {
//   try {
//     const {
//       params: { userId },
//       body,
//       tokenData: { userId: tokenUserId },
//     } = req;

//     if (userId !== tokenUserId) {
//       throw new Error('Cant change other users');
//     }

//     const user = await User.findByIdAndUpdate(userId, body, { new: true });

//     res.status(200).send({ data: user });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports.deleteUser = async (req, res, next) => {
//   try {
//     const {
//       params: { userId },
//     } = req;

//     const user = await User.findByIdAndDelete(userId);

//     res.status(200).send({ data: user });
//   } catch (error) {
//     next(error);
//   }
// };
