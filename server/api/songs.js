const router = require('express').Router();
const Song = require('../db/models/song');
const fs = require('fs');

router.get('/', async (req, res, next) => {
  try {
    const allSongs = await Song.findAll();
    res.json(allSongs);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newSong = await Song.create(req.body);
    res.status(201).send(newSong);
  } catch (err) {
    next(err);
  }
});

router.post('/upload', async (req, res, next) => {
  req.files.forEach(file =>
    fs.writeFileSync(`public/songs/${file.originalname}`, file.buffer)
  );
  res.sendStatus(201);
});

router.get('/:songId', async (req, res, next) => {
  try {
    const song = await Song.findByPk(req.params.songId);
    res.json(song);
  } catch (err) {
    next(err);
  }
});

router.delete('/:songId', async (req, res, next) => {
  try {
    const song = await Song.findByPk(req.params.songId);
    await song.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
