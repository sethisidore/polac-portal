const User = require('./user.model');
const { Cadet, Staff } = require('./bio-data');


const getAllCadets = async(res) => {

};

const getAllLecturers = async (res) => {

};


const determineAndFetchDetails = async (req, res) => {
  if (req.body.type === 'cadet'){
    // find users detail from Cadet
  }
  if (req.body.type === 'staff') {
    // Find User's detail from Staff
  }
};

const determineAndUpdateDetails = (req, res) => {
  if (req.body.type === 'cadet') {
    // Update user's detail in Cadet
  }
  if (req.body.type === 'staff') {
    // Update user's detail in Staff
  }
}

module.exports = {
  getAllCadets,
  getAllLecturers,
  determineAndFetchDetails,
  determineAndUpdateDetails,
};
