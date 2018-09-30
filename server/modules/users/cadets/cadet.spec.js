const chai = require('chai');
const chaiHttp = require('chai-http');

const cadet = require('./cadet.model');

const mongoose = require('mongoose')
const server = require('../../../bin/www');
const should = chai.should();

chai.use(chaiHttp); 