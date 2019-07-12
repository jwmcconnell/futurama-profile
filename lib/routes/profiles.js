const express = require('express');
const Router = express.Router();

const Profile = require('../models/Profile');

module.exports = Router
  .get('/', (req, res, next) => {
    Profile
      .find({})
      .lean()
      .then(profiles => res.send(profiles))
      .catch(err => next(err));
  });
