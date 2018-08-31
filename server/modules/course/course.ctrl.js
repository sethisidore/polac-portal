const logger = require('morgan');
const Course = require('./course.model');

const courseList = async (req, res) => {
  logger.info('API called to get all courses');
  const course = await Course.find({}, 'courseID title load dept');
  res.json(course);
};

const courseInfo = async (req, res) => {
  const info = await Course.findById(req.params.id).exec({});
  res.json(info);
};

const updateCourseInfo = async (req, res) => {
  logger.info('API called to update course information');
  const { id } = req.params;

  const updateInfo = await Course.findByIdAndUpdate({ courseId: id }, req.body, { new: true });
  res.json(updateInfo);
};

const newCourse = async (req, res) => {
  logger.info('API called to create new course');
  const course = new Course({
    title: req.body.title,
    load: req.body.load,
    summary: req.body.summary,
    pre_req: req.body.pre_req,
    lecturer: req.body.lecturer,
    courseId: req.params.id,
  });
  res.json(course);
};

const deleteCourse = async (req, res) => {
  logger.info('API Called to delete course by id');

  const course = await Course.findByIdAndRemove({ _id: req.params.id });
  res.json(course);
};

module.exports = {
  courseList, courseInfo, updateCourseInfo, newCourse, deleteCourse,
};
