const express = require('express')
const mongoose = require('mongoose');
   
const app = express()
app.use(express.json())
const coursesRouters= require('./routes/courseRoutes')
app.use('/api/courses',coursesRouters)


mongoose.connect('mongodb+srv://nadabadawy_db_user:Password%40186@cluster0.hqfxchh.mongodb.net/NodeJsInetial?appName=Cluster0').then(()=>{
    console.log("database is connected");
}).catch(()=>{
    console.log("database is not connected");
}) 


app.listen(3000, () => {
    console.log("server is running on port 3000");
})