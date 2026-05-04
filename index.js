require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const httpStatusText=require('./utils/httpStatusText') 
const cors = require('cors')
const app = express()
app.use(express.json())
const coursesRouters= require('./routes/courseRoutes')
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("database is connected");
}).catch(()=>{
    console.log("database is not connected");
}) 
app.use(cors())

app.use('/api/courses',coursesRouters)

app.use((req,res,next)=>{
return res.status(404).json({status:httpStatusText.ERROR,message:"url not found"})
    
}) 
app.use((err,req,res,next)=>{
 
    res.status(err.statusCode||500).json({status:err.statusText||httpStatusText.ERROR,message:err.message,code:err.statusCode})
})


app.listen(process.env.PORT ||3000, () => {
    console.log("server is running on port 3000");
})