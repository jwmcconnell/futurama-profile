const request = require('superagent');

const getRandomTagline = (character) => {
  return request
    .get(`https://futuramaapi.herokuapp.com/api/characters/${character}/1`)
    .then(res => res.body);
};

module.exports = {
  getRandomTagline
};
