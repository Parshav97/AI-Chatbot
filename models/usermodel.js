const express = require("express")
const mongoose = require("mongoose")
const emailValidator = require('email-validator')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: function(){
            emailValidator.validate(this.email)
        }
    },
    password:{
        type:String,
        required:true,
        minLength: 8
    }
})

userSchema.pre('save', async function(){
    let salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    
})

const userModel = mongoose.model("usermodel", userSchema)
module.exports=userModel
