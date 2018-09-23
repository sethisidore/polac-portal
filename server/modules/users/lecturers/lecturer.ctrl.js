const Lecturer = require('./lecturer.model');

const listAllLecturers = async (req, res) => {
  const lecturers = await Lecturer.find({}).exec();
  res.json(lecturers);
};

const getLecturer =  async (req, res) => {
  const { id } = req.params;
  const lecturer = await Lecturer.findById(id).populate('dept').execPopulate();
  res.json(lecturer);
};

 const updateLecturer = async (req, res) => {
  const { id } = req.params;
  const result = await Lecturer.findByIdAndUpdate(id, req.body, { new: true, runValidator: true }).exec({});
  res.json(result);
};

module.exports = {
  getLecturer,
  listAllLecturers,
  updateLecturer,
};
