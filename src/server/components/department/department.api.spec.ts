process.env.NODE_ENV = 'test';

import * as mongoose from 'mongoose';
import * as chai from 'chai';
const chaiHttp = require('chai-http');

import { server } from '../../server';
// import { Department} from './department.model';

chai.should();
chai.use(chaiHttp);


const mongoUri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
let Department: mongoose.Model<mongoose.Document>;

before(async () => {
  try {
    const db = await mongoose.createConnection(mongoUri, {useNewUrlParser: true, useFindAndModify: false });
    Department = db.model('Department');
  } catch (e) {
    console.log(`Error: ${e}`);
  }
});

describe('@DeptApi', () => {
  beforeEach(async () => {
    await Department.remove({}).exec();
  });

  describe('GET api/department', async () => {
    it('Should return all dept in database', async() => {
      const response = await chai.request(server).get('/api/department');
      response.body.should.be.an('array');
      response.should.have.status(200);
      response.body.should.have.length.eql(0);
    });
  });

  describe('GET api/department/:id', () => {
    it('Should return a dept given by id', async () => {
      const dept = new Department({
        _id: new mongoose.Types.ObjectId(),
        deptId: 'his',
        name: 'History',
        headOfDepartment: new mongoose.Types.ObjectId(),
        faculty: new mongoose.Types.ObjectId,
        accreditation: {
          status: true,
          date: new Date(Date.now())
        }
      });
      await dept.save();

      const response = await chai.request(server).get(`/department/his`).send(dept);
      response.body.should.have.status(200);
      response.body.should.have.property('deptId').eql('his');
    });
  });
});

