const Profile = require('../lib/models/Profile');

const seedProfiles = [
  {
    name: 'Jack',
    favoriteCharacter: 'Bender',
    tagline: 'Bite my shiny metal ass!'
  },
  {
    name: 'Lance',
    favoriteCharacter: 'Fry',
    tagline: 'Something Fry said.'
  }
];

function seedData() {
  return Promise.all(seedProfiles.map(profile => {
    const { name, favoriteCharacter, tagline } = profile;
    return Profile.create({ name, favoriteCharacter, tagline });
  }));
}

module.exports = seedData;
