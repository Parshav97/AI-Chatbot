const express = require("express")
const cookieParser = require("cookie-parser");
const OpenAI = require("openai");
const makeConnectionToMongoDBAtlas = require("./makeDBConnection")
const makeSocketConnection = require("./makeSocketConnection")
const { createServer } = require("http")
const { Server } = require("socket.io")
const userRouter = require("./Routers/userRouter")
const conversationRouter = require("./Routers/conversationRouter")
// const { OPENAI_API_KEY } = require("./secret")
const dotenv = require('dotenv')
dotenv.config({path:".env"})

const path = require('path')

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
});

const app = express()

const httpServer = createServer(app)
const io = new Server(httpServer)
const PORT = process.env.PORT

//make connection to atlas
makeConnectionToMongoDBAtlas()
makeSocketConnection(io, openai)

app.use(express.json())
app.use(cookieParser());


app.use((req,res,next)=>{
    req.io = io
    return next()
})

app.use(express.static(path.join(__dirname, "public")));
app.use('/userRoute',userRouter)
app.use('/conversationRoute',conversationRouter)

app.get("/", (req, res) => { 
    res.redirect('/userRoute/signup'); 
  }); 

app.get("*", (req, res) => { 
    res.send("PAGE NOT FOUND"); 
  }); 


httpServer.listen(PORT, ()=> console.log(`Server Listening on Port:${PORT}`))

