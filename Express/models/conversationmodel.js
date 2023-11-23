const mongoose = require("mongoose")


const conversationSchema = mongoose.Schema({
    userId:{
        type: String
    },
    heading:{
        type: String,
    },
    updatedAt:{
        type: Date,
    }
})

const conversationModel = mongoose.model("conversationModel", conversationSchema)

module.exports=conversationModel