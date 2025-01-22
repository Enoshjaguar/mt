import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

 
  const navigate = useNavigate()
  const handlenavigate = (path)=>{
    navigate(path)
  }
  return (
    <div className='navbar'>
        <div className="nav-section">
            <ul>
                <li onClick={()=>handlenavigate('/')}>Home</li>
                <li onClick={()=>handlenavigate('/blogs')}>Write</li>
                <li onClick={()=>handlenavigate('/allblogs')}>All Blogs</li>
                <li onClick={()=>handlenavigate('/login')}>Login</li>
                <li onClick={()=>handlenavigate('/signup')}>SignUp</li>
              
              
                
                
            </ul>
        </div>
    </div>
  )
}

export default Navbar