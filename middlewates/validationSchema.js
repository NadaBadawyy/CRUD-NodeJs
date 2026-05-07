const { body } = require('express-validator')
const courseValidation =[
    body('title').notEmpty().withMessage('title is required').isLength({ min: 2 }).withMessage('title is at least 2 chars'),
    body('price').notEmpty().withMessage('price is required').isNumeric().withMessage('price is a number')
]

const updateCourseValidation =[
    body('title').optional().isLength({ min: 2 }).withMessage('title is at least 2 chars'),
    body('price').optional().isNumeric().withMessage('price is a number')
]
const registerValidation=[
    body('firstname').notEmpty().withMessage('firstname is required').isLength({ min: 2 }).withMessage('firstname is at least 2 chars'),
    body('lastname').notEmpty().withMessage('lastname is required').isLength({ min: 2 }).withMessage('lastname is at least 2 chars'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('email is a valid email'),
    body('password').notEmpty().withMessage('password is required').isLength({ min: 6 }).withMessage('password is at least 6 chars')
]
const loginValidation=[
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('email is a valid email'),
    body('password').notEmpty().withMessage('password is required').isLength({ min: 6 }).withMessage('password is at least 6 chars')
]
module.exports={
    courseValidation,
    updateCourseValidation,
    registerValidation,
    loginValidation
}