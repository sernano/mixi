const router = require('express').Router();
const Playlist = require('../db/models/playlist');

router.get('/', async (req, res, next) => {
  try {
    const allPlaylists = await Playlist.findAll();
    res.json(allPlaylists);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newPlaylist = await Playlist.create(req.body);
    res.status(201).send(newPlaylist);
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

router.get('/user/:userId', async (req, res, next) => {
  try {
    const playlists = await Playlist.findAll({
      where: {
        userId: req.params.userId
      }
    });
    res.json(playlists);
  } catch (err) {
    next(err);
  }
});

router.delete('/:playlistId', async (req, res, next) => {
  try {
    const playlist = await Playlist.findByPk(req.params.playlistId);
    await playlist.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
