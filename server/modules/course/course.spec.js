const chai = require('chai');
const chaiHttp = require('chai-http');

const Courses = require('./course.model');
const Dept = require('../dept');
const { UserLecturer } = require('../users');

const mongoose = require('mongoose');
const { Mockgoose } = require('mockgoose');
const mockgoose = new Mockgoose(mongoose);

const server = require('../../bin/www');
const should = chai.should(); 

chai.use(chaiHttp);

before(async () => {
  mockgoose.prepareStorage().then(() => {
    mongoose.connect('mongodb://localhost:27017/test', function(err) {
			done(err);
    });
  });
});

describe('Courses', () => {
  before(async () => {
    const dept = new Dept({
      dept_id: 'mth',
      name: 'Mathematics',
      est: new Date(2018, 3, 3),
    });
    await dept.save();

    const lecturer = new UserLecturer({
      username: 'Baba_Rwanda',
      password: '9839jdk',
      Fname: 'Raifu',
      Lname: 'Ajaiyi',
      Oname: 'Abdul',
      rank: 'Senior Lecturer',
      dept: dept._id,
      degrees: ['Bsc Mathematics - 1998', 'Msc Mathematics - 2004', 'Phd. Mathematics - ongoing'],
    });
    await lecturer.save();

  });

  beforeEach(async () => {
    await Courses.remove({}).exec();
  });

  /*
  * Test the /GET route
  */
  describe('/GET courses', () => {
    it('it should get all courses', async () => {
      chai.request(server)
            .get('/courses')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('array');
              res.body.length.should.be.eql(0);
            });
    });
  });
  /*
  * Test the /GET/:id route
  */
  describe('/GET/:id course', async () => {
    it.skip('it should get a course given by the id', () => {
      const course = new Courses({
        _id: new mongoose.Types.ObjectId(),
        title: 'Solid State Physics I',
        load: 3,
        

      });
    })
  });
});