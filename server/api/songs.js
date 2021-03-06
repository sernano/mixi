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
    const file = req.files[0];
    const mp3FilePath = `songs/${file.originalname}`;
    fs.writeFileSync(`public/${mp3FilePath}`, file.buffer);
    const mp3Id3 = NodeID3.read(`public/${mp3FilePath}`);
    let imgFilePath;
    if (mp3Id3.image) {
      imgFilePath = `covers/${mp3Id3.album}.${mp3Id3.image.mime.toLowerCase()}`;
      fs.writeFileSync(`public/${imgFilePath}`, mp3Id3.image.imageBuffer);
    } else {
      imgFilePath = 'covers/no_art.jpg';
    }
    const song = await Song.create({
      name: mp3Id3.title,
      artist: mp3Id3.artist,
      album: mp3Id3.album,
      songUrl: `/${mp3FilePath}`,
      coverArtUrl: `/${imgFilePath}`
    });
    res.status(201).json(song);
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
    if (fs.existsSync(`public/${song.songUrl}`)) {
      fs.unlink(`public/${song.songUrl}`, err => {
        if (err) throw err;
        else console.log(`Deleted public/${song.songUrl}`);
      });
    }
    if (fs.existsSync(`public/${song.coverArtUrl}`)) {
      if (song.coverArtUrl !== '/covers/no_art.jpg') {
        fs.unlink(`public/${song.coverArtUrl}`, err => {
          if (err) throw err;
          else console.log(`Deleted public/${song.coverArtUrl}`);
        });
      }
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
