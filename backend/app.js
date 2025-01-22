const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')

const mongoose = require('mongoose')
const userRoutes = require('./Routes/UserRoutes')
const blogRoutes = require('./Routes/BlogRoutes')
dotenv.config()
const app = express()



app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use('/user',userRoutes)
app.use('/blogs',blogRoutes)
app.use('/public', express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("database connected successfully"))
    .catch(err=>console.log("error connecting to database",err))
app.listen(process.env.PORT,()=>{
    console.log("server initiated and listening at ",process.env.PORT)
})

