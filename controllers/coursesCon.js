const Course= require('../models/courses.model')
const {validationResult}=require('express-validator')
const getAllCourses=async (req, res) => {
    const courses= await Course.find()
    res.json(courses)
}

const getCourse=async(req, res) => {
    try{
       const course= await Course.findById(req.params.id)

        if (!course) {
        return res.status(404).json({ msg: 'course not found' }) 
    }
     res.json(course)
   
    }
    catch (err){ 
        res.status(400).json({msg:"invalid id"}) 
    }
   

}
const addCourse=async(req, res) => {
   
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const course = new Course(req.body)
    await course.save()

    res.status(201).json(course)
}
const updateCourse=async(req,res)=>{
    try{
       const course=await Course.findOneAndUpdate({_id:req.params.id},{$set:{...req.body}},{new:true})
    if(!course) return res.status(404).json({msg:"course is not found"})
    res.status(200).json(course)  
    }
    catch(err){
        res.status(400).json({msg:"invalid id"})
    }
   

}
const deleteCourse=async(req,res)=>{
    try{
        const result=await Course.deleteOne({_id:req.params.id})
        if(!result.deletedCount) return res.status(404).json({msg:"course is not found"})  
    res.status(200).json({msg:"course is deleted"})
    }
    catch(err){
        res.status(400).json({msg:"invalid id"})
    }
}
module.exports={
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}