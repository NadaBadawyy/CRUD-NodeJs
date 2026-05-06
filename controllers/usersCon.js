const jwt = require('jsonwebtoken')
const User = require('../models/users.model')
const AppError = require('../utils/AppError')
const httpStatusText = require('../utils/httpStatusText')
const bcrypt = require('bcryptjs')
const getUsers = async (req, res) => {
    

    const query = req.query
    const limit = query.limit || 10
    const page = query.page || 1
    const skip = (page - 1) * limit
    const users = await User.find({}, { "__v": 0,"password":0,"token":0 }).limit(limit).skip(skip)
    res.json({ status: httpStatusText.SUCCESS, data: { users } })

}
const register = async (req, res, next) => {

    const { firstname, lastname, email, password } = req.body
    const oldUser = await User.findOne({ email })
    if (oldUser) {
        const error = AppError.create('Email is already Exist', 400, httpStatusText.FAIL)
        return next(error)
    }

    const hashedPassword = await bcrypt.hash(password, 9)
    

    const newUser = new User({
        firstname,
        lastname,
        email,
        password:hashedPassword
    })
    const token=jwt.sign({id:newUser._id,email:newUser.email},process.env.JWT_SECRET_KEY,{expiresIn:'1m'})
    newUser.token=token
    await newUser.save()
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { user: newUser } })
}
const login = async(req,res,next) => {
    const {email,password}=req.body

    const user= await User.findOne({email:email})
    if(!user){
        const error= AppError.create('user is not found',400,httpStatusText.FAIL)
        return next(error)
    }
    const matchedPassword= await bcrypt.compare(password,user.password)
    if(user&&matchedPassword){
     const token=jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET_KEY,{expiresIn:'1m'})
     res.json({status:httpStatusText.SUCCESS,data:{token}})
     
    }
    else{
        const error= AppError.create('password is not correct',400,httpStatusText.FAIL)
        return next(error)
    }

 }
module.exports = {
    getUsers,
    login,
    register
}