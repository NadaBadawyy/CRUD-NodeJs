const express= require('express')
const router= express.Router()
const userController=require('../controllers/usersCon')
const verifyToken = require('../middlewates/VerifyJWT')
const {registerValidation,loginValidation}=require('../middlewates/validationSchema')
router.route('/').get(verifyToken,userController.getUsers)
router.route('/login').post(loginValidation,userController.login)
router.route('/register').post(registerValidation,userController.register)
module.exports=router
