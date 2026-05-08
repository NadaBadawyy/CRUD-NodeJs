const mongoose=require('mongoose');
const validator=require('validator')
const UserRoles = require('../utils/UserRoles');
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
    role:{
        type:String,
        enum:[UserRoles.ADMIN,UserRoles.USER,UserRoles.MANGER],
        default:UserRoles.USER
    },
    avatar:{
        type:String,
        default:'/uploads/profile.jpg'
    }
});
const User=mongoose.model('User',userSchema)
module.exports=User
