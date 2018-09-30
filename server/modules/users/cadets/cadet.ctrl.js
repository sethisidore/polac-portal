const Cadet= require('./cadet.model');

const listAllCadet = async (req, res) => {
  const cadets = await Cadet.find({}).exec();
  res.json(cadets);
};

const getCadetById = async (req, res) => {
  const { id } = req.params;
  const cadet = await Cadet.findById({ cadet_id: id }).populate('dept').execPopulate();
  res.json(cadet);
};

const updateCadet = async (req, res) => {
  const { id } = req.params;
  const result = await Cadet.findByIdAndUpdate(id, req.body, { new: true, runValidator: true }).exec({});
  res.json(result);
};

module.exports = {
  getCadetById,
  listAllCadet,
  updateCadet,
};
