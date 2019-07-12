require('dotenv').config();
const mongoose = require('mongoose');
const seedData = require('./seedData');
const Profile = require('../lib/models/Profile');

const connect = require('../lib/utils/connect');

beforeAll(() => {
  return connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seedData();
});

afterAll(() => {
  return mongoose.connection.close();
});

const getProfile = () => {
  return Profile
    .findOne()
    .then(profile => {
      return JSON.parse(JSON.stringify(profile));
    });
};

module.exports = {
  getProfile
};
