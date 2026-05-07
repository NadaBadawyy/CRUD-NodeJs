const mongoose=require('mongoose');
const validator=require('validator')
const userSchema= new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,'invalid email provided']
    },
    password:{
            type:String,
        required:true
    },
    token:{
     type:String   
    }

});
const User=mongoose.model('User',userSchema)
module.exports=User
