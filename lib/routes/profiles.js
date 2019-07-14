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

    if(!name) return res.status(400).json('Please provide a name for your profile');
    if(!favoriteCharacter) return res.status(400).json('Please provide a favorite character for your profile');
    if(!tagline.quote) return res.status(404).json('No quotes found for that character. Please check your spelling or try another character');


    Profile
      .create({
        name,
        favoriteCharacter,
        tagline: tagline.quote
      })
      .then(profile => res.send(profile))
      .catch(err => next(err));
  })
  .patch('/:id', futuramaTagline, (req, res, next) => {
    const { id } = req.params;
    const { favoriteCharacter } = req.body;
    const { tagline } = req;

    if(!favoriteCharacter) return res.status(400).json('Please provide a favorite character for your profile');

    Profile
      .findOneAndUpdate(
        { _id: id },
        { favoriteCharacter, tagline: tagline.quote },
        {
          new: true,
          useFindAndModify: false
        }
      )
      .then(tweet => res.send(tweet))
      .catch(err => next(err));
  });
