const router = require('express').Router;
const Playlist = require('../db/models/playlist');

router.get('/', async (req, res, next) => {
  try {
    const allPlaylists = await Playlist.findAll();
    res.json(allPlaylists);
  } catch (err) {
    next(err);
  }
});

router.get('/:playlistId', async (req, res, next) => {
  try {
    const playlist = await Playlist.findByPk(req.params.playlistId);
    res.json(playlist);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
