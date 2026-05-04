const express=require("express")
const router= express.Router()
const {courseValidation}=require('../middlewates/validationSchema')
const courseControllers=require('../controllers/coursesCon')
router.route('/')
    .get( courseControllers.getAllCourses)
    .post(courseValidation,courseControllers.addCourse )


router.route('/:id')
    .get(courseControllers.getCourse )
    .patch(courseControllers.updateCourse)
    .delete(courseControllers.deleteCourse)

module.exports=router