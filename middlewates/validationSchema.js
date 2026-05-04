const { body } = require('express-validator')
const courseValidation =[
    body('title').notEmpty().withMessage('title is required').isLength({ min: 2 }).withMessage('title is at least 2 chars'),
    body('price').notEmpty().withMessage('price is required').isNumeric().withMessage('price is a number')
]

const updateCourseValidation =[
    body('title').optional().isLength({ min: 2 }).withMessage('title is at least 2 chars'),
    body('price').optional().isNumeric().withMessage('price is a number')
]
module.exports={
    courseValidation,
    updateCourseValidation
}