const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  favoriteCharacter: {
    type: String,
    required: true
  },
  tagline: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Profile', profileSchema);
