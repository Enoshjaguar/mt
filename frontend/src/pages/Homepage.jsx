import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { API_PATH } from '../../data/ApiPath'
import '../App.css'
import { Link } from 'react-router-dom'
import UserNavbar from './UserNavbar'
const Homepage = () => {
  const [blogs,setBlog] = useState('')

  const fetchAllBlogs = async()=>{

    try {
      const response = await axios.get(`${API_PATH}/blogs/allblogs`)
      setBlog(response.data.allblogs)
      
      
    } catch (error) {
      console.log(error)
      alert("blogs fetching failed")
      
    }
  }

  useEffect(()=>{
    fetchAllBlogs()
  },[])

const truncateContent = (content,maxLength)=>{
  if(!content){
    return
  }
  if(content.length>maxLength){
    return content.substring(0,maxLength)
  }
  return content
}

  return (
    <>
    <div>
      <UserNavbar/>
      <div className="all">
        <div className="blog-container">
        
          {blogs.length>0?(
            blogs.map((blog,index)=>(
              <div key={index} className="blog-item">
                
                <h2>{blog.title}</h2>
                <h3>{truncateContent(blog.content,100)}</h3>
                <h3>{blog.tags}</h3>
                <p>Author : {blog.author?.username || 'unknown  '}</p>
                <Link to={`/blogs/getblogbyid/${blog._id}`}>
                <button>Read More</button>
                </Link>
                
              </div>
              
            ))
          ):(
            <p>No blogs available</p>
          )}
          
        </div>
      </div>
      
    </div>
    </>
  )
}

export default Homepage