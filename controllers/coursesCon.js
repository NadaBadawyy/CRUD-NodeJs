const Course = require('../models/courses.model')
const { validationResult } = require('express-validator')
const httpStatusText = require('../utils/httpStatusText')
const AsyncWrapper = require('../middlewates/AsyncWrapper')
const AppError = require('../utils/AppError')
const getAllCourses = AsyncWrapper(async (req, res) => {
    const query = req.query
    const limit = query.limit || 10
    const page = query.page || 1
    const skip = (page - 1) * limit

    const courses = await Course.find({}, { "__v": 0 }).limit(limit).skip(skip)
    res.json({ status: httpStatusText.SUCCESS, data: { courses } })
})

const getCourse = AsyncWrapper(async (req, res, next) => {

    const course = await Course.findById(req.params.id)

    if (!course) {
        const error = AppError.create(`course not found`, 404, httpStatusText.FAIL)

        return next(error)
    }
    res.json({ status: httpStatusText.SUCCESS, data: { course } })
})
const addCourse = AsyncWrapper(async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = AppError.create(errors.array(), 400, httpStatusText.FAIL)
        return next(error)
    }
    const course = new Course(req.body)
    await course.save()

    res.status(201).json({ status: httpStatusText.SUCCESS, data: { course } })
})
const updateCourse = AsyncWrapper(async (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const error = AppError.create(errors.array(), 400, httpStatusText.FAIL)
        return next(error)
    }
    const course = await Course.findOneAndUpdate({ _id: req.params.id }, { $set: { ...req.body } }, { new: true })
    if (!course) {
        const error = AppError.create(`course not found`, 404, httpStatusText.FAIL)
        return next(error)
    }
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } })
})
const deleteCourse = AsyncWrapper(async (req, res, next) => {

    const result = await Course.deleteOne({ _id: req.params.id })
    console.log(result);

    if (!result.deletedCount) {
        const error = AppError.create(`course not found`, 404, httpStatusText.FAIL)
        return next(error)
    }
    res.status(200).json({ status: httpStatusText.SUCCESS, data: null })
})
module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}