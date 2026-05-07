const express=require("express")
const router= express.Router()
const {courseValidation,updateCourseValidation}=require('../middlewates/validationSchema')
const courseControllers=require('../controllers/coursesCon')
const verifyToken = require("../middlewates/VerifyJWT")
const UserRoles = require("../utils/UserRoles")
const allowedRoles = require("../middlewates/allowedRoles")
router.route('/')
    .get( courseControllers.getAllCourses)
    .post(verifyToken,allowedRoles(UserRoles.ADMIN,UserRoles.MANGER),courseValidation,courseControllers.addCourse )

router.route('/:id')
    .get(courseControllers.getCourse )
    .patch(verifyToken,allowedRoles(UserRoles.ADMIN,UserRoles.MANGER),updateCourseValidation,courseControllers.updateCourse)
    .delete(verifyToken,allowedRoles(UserRoles.ADMIN,UserRoles.MANGER),courseControllers.deleteCourse)

module.exports=router