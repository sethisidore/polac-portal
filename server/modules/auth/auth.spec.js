const chai = require('chai');
const chaiHttp = require('chai-http');

<<<<<<< HEAD
const { UserLecturer, UserStudent } = require('../users');
=======
const { UserLecturer, Usercadet } = require('../users');
>>>>>>> renamed student to cadet

const mongoose = require('mongoose')
const server = require('../../bin/www');
const should = chai.should();

chai.use(chaiHttp);