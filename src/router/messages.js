const { Router } = require("express");
const { validateToken } = require("../middlewares/validate-token");
const { getChat } = require("../controllers/messages");

const MessagesRouter = Router();

MessagesRouter.get("/:to", validateToken, getChat);

module.exports = MessagesRouter;
