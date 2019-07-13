const { getRandomTagline } = require('../services/futuramaApi.js');

module.exports = (req, res, next) => {
  getRandomTagline(req.body.favoriteCharacter)
    .then(tagline => {
      req.tagline = tagline[0];
      next();
    });
};
