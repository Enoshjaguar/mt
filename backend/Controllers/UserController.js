const User = require('../Models/UserModel')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const addnewUser = async(req,res)=>{
    const {fullname,username,email,password,file} = req.body
   
    try {
        
        const Useremail = await User.findOne({email})
        if(Useremail){
            console.log("user already registered please login")
            return res.status(500).json({message:"user already registered please login"})
        }

        const hashedpassword = await bcrypt.hash(password,10)

        const newUser = new User({fullname,username,email,password:hashedpassword,
            file:req.file ? req.file.path:undefined})

        await newUser.save()
        console.log("user registered successfully")
        return res.status(200).json({message:"user registered successfully"})

    } catch (error) {
        console.error("user registration failed",error)
        return res.status(500).json({message:"registration failed"})
        
    }
}

const userlogin = async(req,res)=>{
    const {email,password} = req.body
    const secretkey = process.env.SECRET_KEY
    try {
        const user = await User.findOne({email})
        
        if(!user || !
            (await bcrypt.compare(password,user.password))){
        console.log("user not registered please sign up")
        return res.status(500).json({message:"user not registered please sign up"})
        }
        const token = jwt.sign({userid:user._id},secretkey,{expiresIn:'1hr'})
       
        const userId = user._id
        console.log("user login successfull")
        return res.status(200).json({message:"user login successfull with token",token,userId})

        
    } catch (error) {
        console.error("user login failed",error)
        return res.status(500).json({message:"login failed"})
    }
}

const getuserbyid = async(req,res)=>{
    const {id} = req.params
    const user = await User.findById(id)
    if(!user){
        console.log("user not found on this id",id)
        return res.status(500).json({message:"user not found on this id"})
    }
    console.log("user fetched successfully",user)
    return res.status(201).json({message:"user data fetched successfully",user:user})
}

module.exports = {addnewUser,userlogin,getuserbyid}