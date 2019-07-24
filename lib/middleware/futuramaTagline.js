const { getRandomTagline } = require('../services/futuramaApi.js');

module.exports = (req, res, next) => {
  if(!req.body.favoriteCharacter) return res.status(400).json('Please provide a favorite character for your profile');
  getRandomTagline(req.body.favoriteCharacter)
    .then(tagline => {
      req.tagline = tagline[0];
      next();
    });
};
