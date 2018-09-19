// const { adminApi, adminModel } = require('./admins');
const { lecturerApi, lecturerModel } = require('./lecturers');
const { studentApi, studentModel } = require('./students');

module.exports = {
  // Admin: adminApi,
  Lecturer: lecturerApi,
  Student: studentApi,

  // UserAdmin: adminModel,
  UserStudent: studentModel,
  UserLecturer: lecturerModel,
};
