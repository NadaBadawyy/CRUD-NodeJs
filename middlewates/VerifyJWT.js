const AppError = require("../utils/AppError")
const httpStatusText=require('../utils/httpStatusText')
const jwt= require('jsonwebtoken')
const verifyToken=async (req,res,next)=>{
    const authHeader=req.headers['token']||req.headers['Token']
    if(!authHeader){
        const error=AppError.create('User is not authorized',401,httpStatusText.FAIL)
        return next(error)
    }
    const token=authHeader.split(' ')[1]
    try{
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET_KEY)
        next()
    }
    catch(err){
        const error=AppError.create('invalid token',400,httpStatusText.FAIL)
        return next(error)
    }
    
    
}
module.exports=verifyToken
