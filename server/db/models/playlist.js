const Sequelize = require('sequelize');
const db = require('../db');

const Playlist = db.define('playlist', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isPublic: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Playlist;
