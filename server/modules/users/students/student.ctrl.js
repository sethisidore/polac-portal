const Student= require('./student.model');

 const listAllStudent = async (req, res) => {
  const students = await Student.find({}).exec();
  res.json(students);
};

const getStudent = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id).exec();
  res.json(student);
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const infoUpdate = await Student.findByIdAndUpdate(id, req.body, { new: true, runValidator: true }).exec({});
  res.json(infoUpdate);
};

module.exports = {
  getStudent,
  listAllStudent,
  updateStudent,
};
