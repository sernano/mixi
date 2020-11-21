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
      console.log(file);
      const mp3FilePath = `songs/${file.originalname}`;
      //use the following function to write the imagefile from
      //NodeID3.read().image.imageBuffer
      fs.writeFileSync(mp3FilePath, file.buffer);
      console.log(NodeID3.read(mp3FilePath));
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
