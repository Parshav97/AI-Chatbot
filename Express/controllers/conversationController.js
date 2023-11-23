const conversationModel = require("../models/conversationmodel")
const chatModel = require("../models/chatmodel")
const dotenv = require('dotenv')
dotenv.config({path:"../../.env"})

module.exports.getConversations = async function getConversations(req, res){
    let userid = req.userId
    let conversations = await conversationModel.find({"userId": userid}).sort({"updatedAt":-1}).limit(process.env.LIMITCONVERSATIONS)
    if(conversations){
        return res.json({
            "conversations": conversations,
            "message": `${conversations.length} conversations found`
        })
    }else{
        return res.json({
            "conversations": [],
            "message": "No Entries Found"
        })
    }
}

module.exports.getConversationById = async function getConversationById(req, res){
    let conv_id =  req.params.id
    let skipEntries = (req.params.page-1)*(process.env.LIMITCHATS)
    // let conversation = await conversationModel.find({"_id": conv_id})
    let chats = await chatModel.find({"conversationId": conv_id}).sort({"datetime":-1}).limit(process.env.LIMITCHATS).skip(skipEntries)
    if(chats){
        return res.json({
            chatMessages: chats,
            "message":"Recent 100 Chat"
        })
    }else{
        return res.json({
            chatMessages:[],
            "message":"No chats yet"
        })
    }
}