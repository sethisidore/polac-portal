const logger = require('morgan');
const Dept = require('./dept.model');
const { Lecturer } = require('../users');

const deptList = async (req, res) => {
  logger.info('API called to get all Depts');
  const data = await Dept.find({}, 'name HoD est');
  res.json(data);
};

const deptInfo = async (req, res) => {
  const data = await Dept.findById({ _id: req.params.id }).exec({});
  res.json(data);
};

const updateDeptInfo = async (req, res) => {
  logger.info('API called to update Dept information');

  const updateInfo = await Dept.findByIdAndUpdate({ _id: req.param.id }, req.body,
    { runValidators: true }, { new: true });
  res.json(updateInfo);
};

const newDept = async (req, res) => {
  logger.info('API called to create new Dept');
  const data = await new Dept({
    name: req.body.name,
    HoD: await Lecturer.find({ name: req.body.name }),
    est: req.body.established,
  });
  res.json(data);
};

const removeDept = async (req, res) => {
  logger.info('API Called to delete Dept by id');

  const data = await Dept.findByIdAndRemove({ _id: req.params.id });
  res.json(data);
};

module.exports = {
  deptList, deptInfo, updateDeptInfo, newDept, removeDept,
};
