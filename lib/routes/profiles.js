const express = require('express');
const Router = express.Router();

const futuramaTagline = require('../middleware/futuramaTagline');
const Profile = require('../models/Profile');

module.exports = Router
  .get('/', (req, res, next) => {
    Profile
      .find({})
      .lean()
      .then(profiles => res.send(profiles))
      .catch(err => next(err));
  })
  .get('/:id', (req, res, next) => {
    Profile
      .findById(req.params.id)
      .lean()
      .then(profile => res.send(profile))
      .catch(err => next(err));
  })
  .post('/', futuramaTagline, (req, res, next) => {
    const { name, favoriteCharacter } = req.body;
    const { tagline } = req;
    Profile
      .create({
        name,
        favoriteCharacter,
        tagline: tagline.quote
      })
      .then(profile => res.send(profile))
      .catch(err => next(err));
  });
