const chatModel = require("../models/chatmodel")
const dotenv = require('dotenv')
dotenv.config({path:"../../.env"})

module.exports.botMessage = async function botReply(data){
    try{
        const chatObj = {
            "role":"bot",
            "message":data.message,
            "datetime":Date.now(),
            "conversationId": data.conv_id
        }
        
        let chat = await chatModel.create(chatObj)
  
        if(chat){
            return {
                "message": "message received",
                "chat" : chat
            }
        }else{
            return {
                "message": " No reply from bot",
                "chat" : {}
            }  
        }

    }catch(err){
        return{
            "message": err.message
        } 
    }
}
