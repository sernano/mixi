const Sequelize = require('sequelize');
const db = require('../db');

const PlaylistToSong = db.define('playlistsToSong', {
  playlistOrder: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = PlaylistToSong;
