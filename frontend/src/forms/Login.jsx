import React, { useState } from 'react'
import Navbar from '../pages/Navbar'
import axios from 'axios'
import { API_PATH } from '../../data/ApiPath'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [isloggedin,setIsLoggedIn] = useState(false)
  const handlesubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await axios.post(`${API_PATH}/user/userlogin`,{
        email,password
      })
      if(response.status===200){
        const token = response.data.token
        localStorage.setItem('authToken',token)
        
        console.log('user login successfull')
        alert('user login successfull')
        setIsLoggedIn(true)
        navigate('/allblogs')
      }
    } catch (error) {
      if(error.response){
        alert(error.response.data.message || "user registration failed") 
      }
      else if(error.response){
        alert("no response received from the server")
      }
      else{
        alert("internal server error")
      }
      console.log("user registration failed",error)
      
    }
  }
  return (
    <>
    <Navbar isloggedin = {isloggedin}/>
     <div className='signup-container'>
        <div className="formsection">
            <form action="" onSubmit={handlesubmit}>
                <h1>Login</h1>
                
                <label htmlFor="">Email : </label>
                <input type="email" placeholder='enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}/> <br /><br />
                <label htmlFor="">Password : </label>
                <input type="password" placeholder='*********' value={password} onChange={(e)=>setPassword(e.target.value)}/> 
                <button className='signupbtn'  type='submit'>LogIn</button>
                <p className='donthaveaccount'>Don't have an Account <span className='donthaveaccountspan' onClick={()=>navigate('/signup')}>signup</span></p>
            </form>
        </div>
    </div>
    </>
    
  )
}

export default Login