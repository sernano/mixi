# Mixi

A mixtape app I built for a school hackathon. It allows you to create "mixtapes" (or playlists) from your personal music library to share with friends.

## Status

Current features include:

* User creation and login
* A bare-bones, prototype UI
* Song upload and library management
* ID3 tag and album art extraction
* Playlist creation and management
* A simple browser-based audio player

## Goals

Ideas I have and what I plan to implement going forward:

* A redesigned, robust UI with light and dark modes
* A full-featured, in-browser audio player
* Tape sharing with nodemailer

## Requirements

Node version 13 or earlier.

## Installation

Fork and clone this repo, then:

```
$ npm install
$ createdb mixi
$ npm run build-client
$ npm run start-dev
```

Navigate to localhost:8080.

## Usage

Start by uploading mp3s to your library. Check the sample-mp3s folder in the topmost directory of this repo for some files to work with.

![Upload files](https://github.com/sernano/mixi/raw/master/screenshots/mixi1.gif)

One your library is populated, you can select a tape to edit its playlist. Clicking the + next to a song in the Library column will add it
to your playlist. If you'd like to remove a song from a tape's playlist, click the - next to the song in the Tape Playlist column. If
you'd like to remove a song from your library, click the - next to the song in the Library column.

![Manage library](https://github.com/sernano/mixi/raw/master/screenshots/mixi2.gif)

Click Play Now to listen to the tape you created!
