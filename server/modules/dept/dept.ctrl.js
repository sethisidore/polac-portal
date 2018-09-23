const logger = require('morgan');
const Dept = require('./dept.model');
const { Lecturer } = require('../users');

const listAllDepts = async (req, res) => {
  logger.info('API called to get all Depts');
  const data = await Dept.find({}, 'name HoD est');
  res.json(data);
};

const getDept = async (req, res) => {
  const data = await Dept.findById({ _id: req.params.id }).exec({});
  res.json(data);
};

const updateDept = async (req, res) => {
  logger.info('API called to update Dept information');
  const { id } = req.params; 

  const updateInfo = await Dept.findByIdAndUpdate(id, req.body,
    { new: true, runValidators: true }).exec({});
  res.json(updateInfo);
};

const postDept = async (req, res) => {
  logger.info('API called to create new Dept');
  const dept = await new Dept({
    name: req.body.name,
    HoD: await Lecturer.find({ name: req.body.name }).exec({}),
    est: req.body.established,
  });
  const result = await dept.save().exec({});
  res.json(result);
};

const removeDept = async (req, res) => {
  logger.info('API Called to delete Dept by id');

  const data = await Dept.findByIdAndRemove({ _id: req.params.id });
  res.json(data);
};

module.exports = {
  getDept,
  listAllDepts,
  postDept,
  removeDept,
  updateDept,
};
