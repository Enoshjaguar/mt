import React, { useEffect, useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {  faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
 


const UserNavbar = () => {
  const [userid,setUserId] = useState(null)
    const navigate = useNavigate()
    
const token = localStorage.getItem('authToken')
console.log(token)
if(!token){
  alert("token expired")
}
    useEffect(()=>{
      try {
        const decodedtoken = jwtDecode(token)
        setUserId(decodedtoken.userid)
      } catch (error) {
        
      }
    },[])

    const handlenavigate = (path)=>{
        navigate(path)
    }
  return (
    <div className='navbar'>
    <div className="nav-section">
        <ul>
            
            <li onClick={()=>handlenavigate('/blogs')}>Write</li>
            <li onClick={()=>handlenavigate('/allblogs')}>All Blogs</li>
            
            <li onClick={()=>handlenavigate(`/user/userbyid/${userid}`)}>
                <FontAwesomeIcon icon={faUser}/>
                </li> 
           
           
            
        </ul>
    </div>
    
   
</div>
  )
}

export default UserNavbar