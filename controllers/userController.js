const userModel = require("../models/usermodel")
const conversationModel = require("../models/conversationmodel")
const chatModel = require("../models/chatmodel")
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../secret')
const bcrypt = require("bcrypt")
const dotenv = require('dotenv')
dotenv.config({path:"../../.env"})

module.exports.signup = async function register(req, res){
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    const doc = new userModel()
    doc.name = name
    doc.email = email
    doc.password = password

    doc.save()
    .then(()=>{
        console.log("User Registered Successfully")
        return res.json({
            "message":"User Registered " + doc._id
        })
    })
    .catch(()=>{
        console.log("Failed to Register User")
        return res.status(500).json({
            "message":"User Registeration Failed"
        })
    })
}

module.exports.login = async function login(req, res){
    const email = req.body.email
    const password = req.body.password
    try{
        let user = await userModel.findOne({"email":email })
        if( user == null){
            return res.status(500).json({
                "message": "User Not Found"
            })
        }else{
            bcrypt.compare(password, user.password)
                .then(()=>{
                    let token = jwt.sign({payload:user.id}, JWT_KEY)
                    res.cookie("login", token, {httpOnly:true, secure:false})

                    return res.json({
                        "message":"User has successfully logged in",
                    })
                })
                .catch(()=>{
                    return res.json({
                        "message":"Invalid Credentials",
                    })
                })
        }
    }catch{
        console.log("Error Occured while Logging In, Please Try Again")
    }
}

module.exports.logout = async function logout(req,res){
    res.cookie('login','')
    return res.json({
        "message":"user logged out successfully"
    })
}

module.exports.startConversation = async function startConversation(req, res){
    try{

        const dataObj = {
            "userId": req.userId,
            "heading": req.body.headline,
            "updatedAt": Date.now()
        }

        let conversation = await conversationModel.create(dataObj)

        return res.json({
            "conversationId": conversation._id
        })

    }catch(err){
        return res.status(500).json({
            "message": err.message
        })
    }
    

}

module.exports.reply = async function reply(req, res){

    try{

        let conv_id = req.body.conversationId
   
        const chatObj = {
            "role":"user",
            "message":req.body.message,
            "datetime":Date.now(),
            "conversationId": conv_id
        }
    
        let chat = await chatModel.create(chatObj)

        const updateConversationObj = {
            "updatedAt":chatObj.datetime
        }

        
        let updatedConversation = await conversationModel.findOneAndUpdate({"_id":conv_id},updateConversationObj )

        return res.json({
            "message": "message received"
        })  
    

    }catch(err){
        return res.status(500).json({
            "message": err.message
        })  
    }

} 