
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config({path:"../.env"})

// const { JWT_KEY } = require("../secret")

function protectroute(req, res, next){
    if(req.cookies.login){
        let verify = jwt.verify(req.cookies.login, process.env.JWT_KEY)
        if(verify){
            req.userId = verify.payload
            next()
        }else{
            return res.json({
                "message":"invalid token"
            })
        }
    }else{
        return res.json({
            "message":"No User Found, Login First"
        })
    }
}

module.exports=protectroute;
