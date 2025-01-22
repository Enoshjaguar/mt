import React from 'react'
import Homepage from './pages/Homepage'
import SignUp from './forms/SignUp'
import Login from './forms/Login'
import Navbar from './pages/Navbar'
import Blog from './forms/Blog'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landingpage from './pages/LandingPage'
import SingleBlog from './pages/SingleBlog'
import ProfilePage from './pages/ProfilePage'
const App = () => {

  return (

    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/allblogs' element={<Homepage/>}/>
        <Route path='/blogs' element={<Blog/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Landingpage/>}/>
        <Route path='/blogs/getblogbyid/:id' element={<SingleBlog/>}/>
        <Route path='user/userbyid/:id' element={<ProfilePage/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>

  )
}

export default App