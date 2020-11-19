const router = require('express').Router;
const Song = require('../db/models/song');

router.get('/', async (req, res, next) => {
  try {
    const allSongs = await Song.findAll();
    res.json(allSongs);
  } catch (err) {
    next(err);
  }
});

router.get('/:songId', async (req, res, next) => {
  try {
    const song = await Song.findByPk(req.params.songId);
    res.json(song);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
