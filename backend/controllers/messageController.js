const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModels");
const Chat = require("../models/chatModels");
const User = require("../models/usermodels");

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name avatar email")
      .populate("chat"); // Has to be in sync with params in messageRoutes

    res.json(messages);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body; // Has to be in-sync with frontend

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  let newMessage = {
    sender: req.user._id,
    content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    message = await message.populate("sender", "name avatar");
    message = await message.populate("chat");

    message = await User.populate(message, {
      path: "chat.users",
      select: "name avatar email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

module.exports = { allMessages, sendMessage };
