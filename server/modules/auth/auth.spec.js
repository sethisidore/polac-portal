const chai = require('chai');
const chaiHttp = require('chai-http');

const { UserLecturer, UserStudent } = require('../users');

const mongoose = require('mongoose')
const server = require('../../bin/www');
const should = chai.should();

chai.use(chaiHttp);