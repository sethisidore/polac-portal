const chai = require('chai');
const chaiHttp = require('chai-http');

const Dept = require('./dept.model');
const { UserLecturer } = require('../users')

const mongoose = require('mongoose')
const { Mockgoose } = require('mockgoose');
const mockgoose = new Mockgoose(mongoose);

const server = require('../../bin/www');
const should = chai.should(); 

chai.use(chaiHttp);


before(function(done) {
	mockgoose.prepareStorage().then(function() {
		mongoose.connect('mongodb://localhost:27017/test', function(err) {
			done(err);
    });
	});
});

describe('Depts', () => {
  before((done) => {
    const hod = new UserLecturer({
      _id: new mongoose.Types.ObjectId(),
      username: 'Baba_Rwanda',
      Fname: 'Raifu',
      Lname: 'Ajaiyi',
      Oname: 'Abdul',
      rank: 'Senior Lecturer',
      degrees: ['Bsc Mathematics - 1998', 'Msc Mathematics - 2004', 'Phd. Mathematics - ongoing'],
    });
    hod.save((err) => {
      done();
    });
  });
  // 
  beforeEach((done => {
    Dept.remove({}, (err) => {
      done();
    })
  }))
  /*
  * Tests the /GET route
  */
  describe('/GET dept', () => {
    it('it should GET all depts', (done) => {
      chai.request(server)
        .get('/depts')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  /*
  * Tests the /GET/:id route 
  */
  describe('/GET/:id', () => {
    it('it should get a dept given by an id', (done) => {
      const dept = new Dept({
        _id: 'bch',
        name: 'BioChemistry',
        est: new Date(2013),
        HoD: hod._id,
      });
      dept.save((err, dept) => {
        chai.request(server)
        .get('/depts/' + dept._id)
        .send(dept)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('_id').eql(dept._id);
          res.body.should.have.property('name');
          res.body.should.have.property('est');
          res.body.should.have.property('HoD');
          done();
        });
      });
    });
  });
  /*
  * Tests the /POST route
  */
  describe('/POST', () => {
    it('it should not POST a department without the HoD field', (done) => {
      const dept = {
        _id: 'csc',
        name: "Computer Science",
        est: new Date(),
      };
      chai.request(server)
        .post('/depts')
        .send(dept)
        .end((err, res) => {
          res.body.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('HoD');
          done();
        });
    });
    it('it should POST a department with complete fields', (done) => {
      const dept = {
        _id: 'csc',
        name: "Computer Science",
        est: new Date(),
        HoD: hod._id,
      };
      chai.request(server)
        .post('/depts')
        .send(dept)
        .end((err, res) => {
          res.body.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('HoD');
          done();
        });
    });
  });
  /*
  * Test /PUT/:id route
  */
  describe('/PUT/:id depts', () => {
    it('it should UPDATE a dept given the id', (done) => {
      const dept = {
        _id: 'his',
        name: 'History & International Studies',
        est: new Date(2017),
        HoD: hod._id,
      };
      dept.save((err, dept) => {
        chai.request(server)
        .put('/depts/' + dept._id)
        .send({
          _id: 'his',
          HoD: hod._id,
          name: 'History & International Relations',
          est: new Date(2017),
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('name').eql('History & International Relations');
          done();
        });
      });
    });
  });
  /*
  * Tests /DELETE/:id route
  */
 describe('/DELETE/:id depts', () => {
   it('it should delete a dept given by the id', (done) => {
     const dept = {
       _id: 'mth',
       name: 'Mathematics',
       HoD: hod._id,
       est: new Date(2014),
     };
     chai.request(server)
     .delete('/depts/' + dept._id)
     .end((err, res) => {
       res.should.have.status(200);
       res.body.should.be.an('object');
       done();
     });
   });
 });
  // Cleanup the HOD UserLecturer
  after((done) => {
   UserLecturer.remove({}, (err) => {
     done();
   });
 });
});
