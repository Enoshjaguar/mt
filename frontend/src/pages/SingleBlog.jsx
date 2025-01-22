import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_PATH } from '../../data/ApiPath'
import {useParams} from 'react-router-dom'
import Navbar from './Navbar'
import UserNavbar from './UserNavbar'
const SingleBlog = () => {

  const {id} = useParams()
  const [blog,setBlog] = useState(null)

  const fetchSingleBlog = async()=>{
    try{
      const response = await axios.get(`${API_PATH}/blogs/getblogbyid/${id}`)
    setBlog(response.data.blog)
    }
    catch(error){
      console.error(error)
      alert("failed to fetch single blog")
    }
  }
  useEffect(()=>{
    fetchSingleBlog()
  },[id])
  if(!blog){
    return <p>Loading.....</p>
  }
  return (
 <>
 <UserNavbar/>

      <div className="single-blog-container">
        <div className="single-blog">
          <h1 className="single-blog-title">{blog.title}</h1>
          <div className="single-blog-image-container">
            {blog.file ? (
              <img
                src={`${API_PATH}/${blog.file.replace(/\\/g, '/')}`}
                alt="Blog visual"
                className="single-blog-image"
              />
            ) : (
              <img
                src="/path/to/placeholder-image.jpg" // Add your placeholder image path here
                alt="no image"
                className="single-blog-image"
              />
            )}
          </div>
          <p className="single-blog-content">{blog.content}</p>
          <div className="single-blog-footer">
            <h3 className="single-blog-tags">Tags: {blog.tags}</h3>
            <p className="single-blog-author">Author: {blog.author?.username || 'Unknown'}</p>
          </div>
        </div>
      </div>
 </>
  )
}

export default SingleBlog