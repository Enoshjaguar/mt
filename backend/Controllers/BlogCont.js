const { default: mongoose } = require('mongoose')
const Blog = require('../Models/BlogModel')
const verifyToken = require('../middlewares/verifyToken')
const addnewblog = async(req,res)=>{
    try {
        const {title,content,tags,category,file,author} = req.body
        console.log("this is req.body",req.body)
        const newblog = new Blog({
            title,content,tags,category,file:req.file ? req.file.path:undefined
            ,author:req.user._id
        })
        const savedBlog = await newblog.save()
        console.log("blog saved successfully",savedBlog)
        return res.status(201).json({message:"blog saved successfully",savedBlog:savedBlog})
    } catch (error) {
        console.error("error saving the blog",error)
        
    }
}

const getallblogs = async(req,res)=>{
    try{
        const allblogs = await Blog.find().populate('author','fullname email username')
        console.log("blogs fetched successfully")
        return res.status(201).json({message:"all blgs fecthed successfully",allblogs:allblogs})
    }
    catch (error) {
        console.error("error fetching the blogs",error)
        
    }
}

const getblogbyid = async(req,res)=>{
    try{
        const {blogid} = req.params
        const blog = await Blog.findById(blogid).populate('author', 'username')
        if(!blog){
            console.log("no blog found")
            return res.status(500).json({message:"no blog found"})
        }
        console.log('blog fecthed successfully',blog)
        return res.status(201).json({message:"blog feched successfuilly",blog:blog})
    }
    catch (error) {
        console.error("error fetching the blog",error)
        
    }
}

const getblogbyuserid = async(req,res)=>{
    try{
        const userid = req.params
        if (!mongoose.Types.ObjectId.isValid(userid)) {
            console.log(userid)
            return res.status(400).json({ message: "Invalid user ID format",userid:userid });
          }
        const blog = await Blog.find({author:new mongoose.Types.ObjectId(userid)})
        if(!blog){
            console.log("no blogs available on this id")
            return res.status(500).json({message:"no blogs available on this id"})
        }
        console.log("blog fetched by author successfully",blog)
        return res.status(201).json({message:"blog fetched by author successfully",blog:blog})
    }
    catch (error) {
        console.error("error fetching the blog by author",error)
        return res.status(500).json({message:"blog fetched by author failed in catch block"})
    }
}

const deleteblogbyid = async(req,res)=>{
    const {id} = req.params
    console.log(id)
    try {
        const deletedblog = await Blog.findByIdAndDelete(id)
        if(!deletedblog){
            console.log("cannot delete the blog")
            console.log("this is the deleted blog",deletedblog)
            return res.status(500).json({message:"cannot delete the blog",deletedblog:deletedblog})
        }
        console.log("blog deleted successfully",deleteblogbyid)
        return res.status(201).json({message:"blog deleted successfully",deletedblog:deletedblog})
    } catch (error) {
        console.log("cannot delete the blog")
            return res.status(500).json({message:"cannot delete the blog"})
        
    }
}

const updateblogbyid = async(req,res)=>{
    const {id} = req.params
    const updatedData = req.body
    try{
        const updatedblog = await Blog.findByIdAndUpdate(id,updatedData,{new:true})
        if(!updatedblog){
            console.log("blog not found to update")
            return res.status(500).json({message:"blog not found to update"})
        }
        console.log("blog updated successfully",updatedblog)
        return res.status(200).json({message:"blog updated successfully"})
    }
    catch (error) {
        console.log("cannot update the blog")
            return res.status(500).json({message:"cannot update the blog"})
        
    }
}

module.exports = {addnewblog,getallblogs,getblogbyid,getblogbyuserid,deleteblogbyid,updateblogbyid}