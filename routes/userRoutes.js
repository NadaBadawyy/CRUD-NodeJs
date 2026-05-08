const express= require('express')
const router= express.Router()
const userController=require('../controllers/usersCon')
const verifyToken = require('../middlewates/VerifyJWT')
const {registerValidation,loginValidation}=require('../middlewates/validationSchema')
const multer  = require('multer')
const AppError = require('../utils/AppError')
const httpStatusText = require('../utils/httpStatusText')
const diskStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')

    },
    filename:(req,file,cb)=>{
        const ext=  file.mimetype.split('/')[1]
        const fileName= `user-${Date.now()}.${ext}`
        cb(null,fileName)
    }
})
const fileFilter=(req,file,cb)=>{
    const imageType=file.mimetype.split('/')[0]
    if(imageType==='image') return cb(null,true)
    else return cb(AppError.create('invalid file type',400,httpStatusText.FAIL),false)
    
    
}
const upload = multer({ storage:diskStorage,fileFilter})

router.route('/').get(verifyToken,userController.getUsers)
router.route('/login').post(loginValidation,userController.login)
router.route('/register').post(upload.single('avatar'),registerValidation,userController.register)
module.exports=router
