const express = require("express")
const userRouter = express.Router()
const path = require('path')
const { signup, login, logout, startConversation, reply } = require("../controllers/userController")
const { makeSocketConnection } = require("../app")

const middleware = require("./middleware")




userRouter
    .route("/signup")
    .post(signup)
    .get((req, res)=> res.sendFile(path.join(__dirname, '../public', 'signup.html')))
    
userRouter
    .route("/login")
    .post(login)
    .get((req, res)=> res.sendFile(path.join(__dirname, '../public', 'login.html')))

userRouter
    .route("/logout")
    .post(middleware, logout)

userRouter
    .route("/startConversation")
    .post(middleware, startConversation)

userRouter
    .route("/reply")
    .post(middleware, reply)

userRouter
    .route("/dashboard")
    .get(middleware, (req,res)=>res.sendFile(path.join(__dirname, '../public', 'dashboard.html')))


module.exports = userRouter;