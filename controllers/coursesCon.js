const Course= require('../models/courses.model')
const {validationResult}=require('express-validator')
const httpStatusText=require('../utils/httpStatusText')
const getAllCourses=async (req, res) => {
    const query=req.query
    const limit= query.limit||2
    const page= query.page||1
    const skip= (page-1)*limit

    const courses= await Course.find({},{"__v":0}).limit(limit).skip(skip)
    res.json({ status : httpStatusText.SUCCESS,data:{courses}})
}

const getCourse=async(req, res) => {
    try{
       const course= await Course.findById(req.params.id)

        if (!course) {
        return res.status(404).json({status:httpStatusText.FAIL ,data: {course:null,message: 'course not found'} }) 
    }
     res.json({status:httpStatusText.SUCCESS,data:{course}})
   
    }
    catch (err){ 
        res.status(400).json({status:httpStatusText.ERROR,message:err.message}) 
    }
   

}
const addCourse=async(req, res) => {
   
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({status:httpStatusText.FAIL,data:errors.array()})
    }
    const course = new Course(req.body)
    await course.save()

    res.status(201).json({status:httpStatusText.SUCCESS,data:{course}})
}
const updateCourse=async(req,res)=>{
    try{
          const errors=validationResult(req)
          console.log(errors);
          
    if(!errors.isEmpty()){
        return res.status(400).json({status:httpStatusText.FAIL,data:errors.array()})
    }
    const course=await Course.findOneAndUpdate({_id:req.params.id},{$set:{...req.body}},{new:true})
    if(!course) return res.status(404).json({status:httpStatusText.FAIL ,data: {course:null,message: 'course not found'} })
    res.status(200).json({status:httpStatusText.SUCCESS,data:{course}})  
    }
    catch(err){
        res.status(400).json({status:httpStatusText.ERROR,message:err.message})
    }
   

}
const deleteCourse=async(req,res)=>{
    try{
        const result=await Course.deleteOne({_id:req.params.id})
        if(!result.deletedCount) return res.status(404).json({status:httpStatusText.FAIL ,data: {course:null,message: 'course not found'} })  
    res.status(200).json({status:httpStatusText.SUCCESS,data:null})
    }
    catch(err){
        res.status(400).json({status:httpStatusText.ERROR,message:err.message})
    }
}
module.exports={
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}