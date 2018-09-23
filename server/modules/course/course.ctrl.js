const logger = require('morgan');
const Course = require('./course.model');
const { UserStudent } = require('../users');

const listAllCourses = async (req, res) => {
  logger.info('API called to get all courses');
  const courseList = await Course.find({}, 'title dept').exec();
  res.json(courseList);
};

const getCourse = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id).populate('dept').execPopulate();
  res.json(course);
};

const updateCourse = async (req, res) => {
  logger.info('API called to update course information');
  const { id } = req.params;

  const result = await Course.findByIdAndUpdate({ courseId: id }, req.body, { new: true, runValidator: true }).exec({});
  res.json(result);
};

const createCourse = async (req, res) => {
  logger.info('API called to create new course');
  const course = new Course({
    title: req.body.title,
    load: req.body.load,
    summary: req.body.summary,
    pre_req: req.body.pre_req,
    lecturer: await UserLecturer.findById({ fullname: req.body.lecturer }),
    courseId: req.params.id,
  });
  const result = await course.save().exec();
  res.json(result);
};

const deleteCourse = async (req, res) => {
  logger.info('API Called to delete course by id');

  const { id } = req.body;
  const result = await Course.findByIdAndRemove({ id });
  res.json(result);
};

module.exports = {
  createCourse,
  deleteCourse,
  getCourse,
  listAllCourses,
  updateCourse,
};
