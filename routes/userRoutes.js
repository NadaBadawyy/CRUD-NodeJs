const express= require('express')
const router= express.Router()
const userController=require('../controllers/usersCon')
const verifyToken = require('../middlewates/VerifyJWT')
router.route('/').get(verifyToken,userController.getUsers)
router.route('/login').post(userController.login)
router.route('/register').post(userController.register)
module.exports=router
