const Faculty = require('./faculty.model');
const { UserLecturer } = require('../users');

const createFaculty = async (req, res) => {
  const faculty = new Faculty(req.body)
  const result = await faculty.save().exec();
  res.status(200).json(result);
};

const listAllFaculties = async (res) => {
  const faculties = await Faculty.find({}).populate('dean').execPopulate({});
  res.status(200).json(faculties);
};

const getFaculty = async (req, res) => {
  const { fac_id }  = req.params;
  
  const result = await Faculty.findById({ fac_id }).populate('dean').execPopulate();
  res.status(200).json(result);
};

const updateFaculty = async (req, res) => {
  const { fac_id } = req.params;
  const result = await Faculty.findByIdAndUpdate({ fac_id }, req.body, { new: true, runValidators: true }).exec({});
  res.json(result);
};

const deleteFaculty = async (req, res) => {
  const { fac_id } = req.params;

  const result = await Faculty.findByIdAndDelete(fac_id);
  res.status(200).json(result);
};

const listDeptsByFaculty = async (req, res) => {
  const { fac_id } = req.params;

  // to be implemented
}

const getDeptByFaculty = async (req, res) => {
  const { fac_id, dept_id } = req.params;
  // to be implemented
}

module.exports = {
  createFaculty,
  getFaculty,
  listAllFaculties,
  updateFaculty,
  deleteFaculty,
  // for sub-modules in faculty
  getDeptByFaculty,
  listDeptsByFaculty,
}