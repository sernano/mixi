const router = require('express').Router();
const {Song, PlaylistToSong, Playlist} = require('../db/models');

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

router.post('/newSong', async (req, res, next) => {
  try {
    const addSong = await PlaylistToSong.create(req.body);
    res.status(201).send(addSong);
  } catch (err) {
    next(err);
  }
});

router.delete('/removeSong', async (req, res, next) => {
  try {
    const songToRemove = await PlaylistToSong.findOne({
      where: {
        playlistId: req.body.playlistId,
        songId: req.body.songId
      }
    });
    songToRemove.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.get('/:playlistId', async (req, res, next) => {
  try {
    const playlist = await Playlist.findOne({
      where: {
        id: req.params.playlistId
      },
      include: [Song]
    });
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
