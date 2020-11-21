const router = require('express').Router();
const Song = require('../db/models/song');
const fs = require('fs');
const NodeID3 = require('node-id3');

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
  try {
    await req.files.forEach(file => {
      const mp3FilePath = `songs/${file.originalname}`;
      fs.writeFileSync(mp3FilePath, file.buffer);
      const mp3Id3 = NodeID3.read(mp3FilePath);
      const imgFilePath = `covers/${
        mp3Id3.album
      }.${mp3Id3.image.mime.toLowerCase()}`;
      fs.writeFileSync(imgFilePath, mp3Id3.image.imageBuffer);
    });
    res.sendStatus(201);
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
