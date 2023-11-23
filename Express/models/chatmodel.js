const mongoose = require("mongoose")
const dotenv = require('dotenv')
dotenv.config({path:"../../.env"})

const chatSchema = mongoose.Schema({
    role:{
        type: String,
        enum: ['user', 'bot']
    },
    message:{
        type: String,
    },
    datetime:{
        type: Date,
    },
    conversationId: {
        type: String
    }
})

const chatModel = mongoose.model("chatModel", chatSchema)

module.exports=chatModel