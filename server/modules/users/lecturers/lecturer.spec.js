const chai = require('chai');
const chaiHttp = require('chai-http');

const Lecturer = require('./lecturer.model');
const Dept = require('../../dept');

const mongoose = require('mongoose');
const { Mockgoose } = require('mockgoose');
const mockgoose = new Mockgoose(mongoose);

const server = require('../../../bin/www');
const should = chai.should();

chai.use(chaiHttp);

before(function(done) {
	mockgoose.prepareStorage().then(function() {
		mongoose.connect('mongodb://localhost:27017/test', function(err) {
			done(err);
    });
	});
});
 
describe('Lecturers', () => {
  before((done) => {
    const dept = new Dept({
      _id: new mongoose.Types.ObjectId(),
      name: ''
    });
  });
});