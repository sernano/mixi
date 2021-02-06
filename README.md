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

## Future features

Ideas I have and what I plan to implement going forward:

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

Navigate to localhost:8080 to try it out! Check the sample-mp3s folder in the topmost directory for files to upload and explore features with.
