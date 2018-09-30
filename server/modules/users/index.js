// const { adminApi, adminModel } = require('./admins');
const { lecturerApi, lecturerModel } = require('./lecturers');
const { cadetApi, cadetModel } = require('./cadets');

module.exports = {
  // Admin: adminApi,
  Lecturer: lecturerApi,
  Cadet: cadetApi,

  // UserAdmin: adminModel,
  UserCadet: cadetModel,
  UserLecturer: lecturerModel,
};
