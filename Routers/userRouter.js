const express = require("express")
const userRouter = express.Router()
const path = require('path')
const { signup, login, logout, startConversation, reply } = require("../controllers/userController")
const middleware = require("./middleware")

const domainName = process.env.DOMAIN


userRouter
    .route("/signup")
    .post(signup)
    .get((req, res)=> res.render(path.join(__dirname, '../public', 'signup.html'), {domain:domainName} ))
    
userRouter
    .route("/login")
    .post(login)
    .get((req, res)=> res.render(path.join(__dirname, '../public', 'login.html'), {domain:domainName}))

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
    .get(middleware, (req,res)=>res.render(path.join(__dirname, '../public', 'dashboard.html'), { domain:domainName}))


module.exports = userRouter;