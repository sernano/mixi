const Sequelize = require('sequelize');
const db = require('../db');

const Song = db.define('song', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  artist: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  album: {
    type: Sequelize.STRING,
    allowNull: false
  },
  songUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  coverArtUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Default image url here',
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Song;
