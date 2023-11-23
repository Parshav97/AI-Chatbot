const express = require("express")
const conversationRouter = express.Router()

const { getConversations, getConversationById } = require("../controllers/conversationController")
const middleware = require("./middleware")

conversationRouter
    .route("/conversations")
    .get(middleware, getConversations)

conversationRouter
    .route("/conversation/:id/:page")
    .get(middleware, getConversationById)

module.exports = conversationRouter