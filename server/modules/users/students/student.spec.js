const chai = require('chai');
const chaiHttp = require('chai-http');

const Student = require('./student.model');

const mongoose = require('mongoose')
const server = require('../../../bin/www');
const should = chai.should();

chai.use(chaiHttp); 