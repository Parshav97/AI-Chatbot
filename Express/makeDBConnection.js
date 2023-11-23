const mongoose = require("mongoose")
const { PASSWORD } = require("../secret")
const connectionString = `mongodb+srv://root:${PASSWORD}@cluster0.bnnwdyv.mongodb.net/`



const makeConnectionToMongoDBAtlas = () => {
    mongoose.connect(connectionString)
        .then(()=>{
            console.log("Connection To The MongoDB Atlas is Successfull")
        })
        .catch(()=>{
            console.log("An Error was encountered in making a connection to MongoDB Atlas")
        })
}

module.exports = makeConnectionToMongoDBAtlas



