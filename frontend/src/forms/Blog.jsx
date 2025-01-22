import { useRef, useState } from "react"
import axios from 'axios'
import { API_PATH } from "../../data/ApiPath"
import UserNavbar from "../pages/UserNavbar"


const Blog = () => {


  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')
  const [tags,setTags ] = useState([])
  const [category,setCategory] = useState('technology')
  const [file,setFile] = useState(undefined)
  const fileInputRef = useRef(null)

 
  const token = localStorage.getItem('authToken')
  const userId = localStorage.getItem('userId')
    

  const resetall = ()=>{
    setTitle('')
    setContent('')
    setTags([])
    setCategory('')
    setFile(undefined)
    if(fileInputRef.current){
      fileInputRef.current.value = null
    }
  }
 
  const handlesubmit = async(e)=>{
    e.preventDefault()
    if (!title || !content || !category || !tags.length) {
      alert("Please fill in all required fields.");
      return;
    }
   if(!token){
    alert("please login to submit a blog")
    return
   }
   
    const formData = new FormData()
      formData.append('title',title)
      formData.append('content',content)
      formData.append('tags',tags)
      formData.append('category',category)
      formData.append('file',file)
    
      
  
    
  
    try {
      const response = await axios.post(`${API_PATH}/blogs/addnewblog`,formData,{
        headers:{
          Authorization:`Bearer ${token}`,
          'Content-Type':'multipart/form-data'
        }
      })
      alert('blog published successfully')
     resetall()
      console.log(response.data)
    } catch (error) {
      console.error("Error submitting blog:", error.response?.data||error.message,"this is the  token",token);
      alert("Failed to publish the blog. Please try again.",token);
      
    }
  }



  return (
    <>
    <UserNavbar/>
    <img src="Images/blogbanner.jpg" className="banner" alt="" />
   <form action="" onSubmit={handlesubmit}>
    <div className="blog">
        <div className="blog-section">
          
            <label htmlFor="">Title</label>
            <input type="text" placeholder='write your title' value={title} onChange={(e)=>setTitle(e.target.value)}/><br />
            <label htmlFor="">Content</label>
            <textarea name="" id="contentinput" value={content} placeholder='start writing your content here' onChange={(e)=>setContent(e.target.value)}></textarea><br />
            <label htmlFor="">Tags</label>
            <input type="text" placeholder='enter your tags(comma separated)' value={tags} onChange={(e)=>setTags(e.target.value)}/><br />
            <label htmlFor="category">Category</label>
<select id="category" name="category" value={category} onChange={(e)=>setCategory(e.target.value)}>
  <option value="technology">Technology</option>
  <option value="lifestyle">Lifestyle</option>
  <option value="health">Health & Wellness</option>
  <option value="travel">Travel</option>
  <option value="food">Food & Recipes</option>
  <option value="education">Education</option>
  <option value="finance">Finance & Business</option>
  <option value="personal-development">Personal Development</option>
  <option value="fashion">Fashion & Beauty</option>
  <option value="sports">Sports</option>
  <option value="entertainment">Entertainment</option>
  <option value="parenting">Parenting</option>
  <option value="diy">DIY & Crafts</option>
  <option value="gaming">Gaming</option>
  <option value="photography">Photography</option>
  <option value="art">Art & Design</option>
  <option value="science">Science & Nature</option>
  <option value="home-improvement">Home Improvement</option>
  <option value="books">Books & Literature</option>
  <option value="news">Current Events/News</option>
</select>

            
            <label htmlFor="">Image</label>
            <input type="file"  name="file" ref={fileInputRef}  onChange={(e)=>setFile(e.target.files[0])}/>
            <button type='submit' className='publishbtn'>Publish</button>
            
        </div>
    </div>
    </form>
    </>
  )
}

export default Blog