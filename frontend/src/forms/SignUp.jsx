import React, { useState } from 'react'
import Navbar from '../pages/Navbar'
import axios from 'axios'
import { API_PATH } from '../../data/ApiPath'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
  const navigate = useNavigate()
  const [fullname,setFullName] = useState('')
  const [username,setUserName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [file,setFile] = useState(null)
const handlesubmit = async(e)=>{
  e.preventDefault()
  try{
    const formData = new FormData();
    formData.append('fullname',fullname)
    formData.append('username',username)
    formData.append('email',email)
    formData.append('password',password)
    if(file){
      formData.append('file',file)
    }

    const response = await axios.post(`${API_PATH}/user/addnewuser`,formData,{
      headers:{
        'Content-Type':'multipart/form-data'
      }
    })

    if(response.status===200){
      console.log("user registered successfully")
      alert("user registered successfully")
      navigate('/login')
    }
  }
  catch (error) {
    if (error.response) {
      alert(error.response.data.message || "User registration failed");
    } else if (error.request) {
      alert("No response received from the server");
    } else {
      alert("Internal server error");
    }
    console.error("User registration failed", error);
  }
}
  return (
    <>
    <Navbar/>
    <div className='signup-container'>
        <div className="formsection">
            <form action="" onSubmit={handlesubmit}>
                <h1>SignUp</h1>
                <label htmlFor="">FullName : </label>
                <input type="text" placeholder='enter full name' value={fullname} onChange={(e)=>setFullName(e.target.value)}/><br /><br />
                <label htmlFor="">UserName : </label>
                <input type="text" placeholder='enter username' value={username} onChange={(e)=>setUserName(e.target.value)}/> <br /><br />
                <label htmlFor="">Email : </label>
                <input type="email" placeholder='enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <label htmlFor="">Password : </label>
                <input type="password" placeholder='*********' value={password} onChange={(e)=>setPassword(e.target.value)}/> 
                <label htmlFor="">Profile</label>
                <input type="file" name='file' onChange={(e)=>setFile(e.target.files[0])}/>
                <button type='submit' className='signupbtn'>SignUp</button>
                <p className='donthaveaccount'>Already have an account <span className='donthaveaccountspan' onClick={()=>navigate('/login')}>login</span></p>
            </form>
        </div>
    </div>
    </>
  )
}

export default SignUp