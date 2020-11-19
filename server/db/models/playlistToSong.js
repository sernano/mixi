const Sequelize = require('sequelize')
const db = require('../db')

const PlaylistsToSong = db.define('playlistsToSong', {
  playlistOrder: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = PlaylistsToSong
