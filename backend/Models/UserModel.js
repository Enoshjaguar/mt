const mongoose = require('mongoose')

const newuserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:false
    }
})

const User = new mongoose.model('User',newuserSchema)

module.exports = User