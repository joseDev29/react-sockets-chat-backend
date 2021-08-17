const Message = require("../models/message");

const getChat = async (req, res) => {
  try {
    const { uid: myId } = req.tokenPayload;
    const messagesTo = req.params.to;

    const last30 = await Message.find({
      $or: [
        { to: myId, from: messagesTo },
        { to: messagesTo, from: myId },
      ],
    })
      .sort({ createdAt: "desc" })
      .limit(30);

    return res.status(200).json({
      ok: true,
      messages: last30,
    });
  } catch (error) {
    console.log("----------> Error in getMessages Controller : ", error);
    return res.status(500).json({
      ok: false,
      msg: "ops, internal error",
    });
  }
};

module.exports = { getChat };
