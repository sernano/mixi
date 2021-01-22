import React from 'react';
import {connect} from 'react-redux';
import Amplitude from 'amplitudejs';
import {fetchCurrPlaylist} from '../store/curr-tape';
import {setActiveSong} from '../store/curr-song';

export class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      playing: false,
      track: null
    };
    this.handleSongChange = this.handleSongChange.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchCurrPlaylist(this.props.match.params.tapeId);
    const songs = this.formatSongs(this.props.tapeSongs);
    Amplitude.init({
      songs: songs,
      callbacks: {
        song_change: this.handleSongChange,
        next: this.handleSongChange,
        prev: this.handleSongChange,
        stop: this.handleStop
      }
    });
  }

  componentDidUpdate() {
    //Amplitude.bindNewElements();
  }

  componentWillUnmount() {
    Amplitude.stop();
  }

  render() {
    const songData = Amplitude.getActiveSongMetadata();
    const coverArtUrl = songData.cover_art_url;
    const artistName = songData.artist;
    const albumName = songData.album;
    const songName = songData.name;
    return (
      <div>
        <img src={coverArtUrl} />
        <br />
        {artistName} - {albumName}
        <br />
        {songName}
        <button
          type="button"
          onClick={() => {
            Amplitude.prev(null);
          }}
        >
          Prev
        </button>
        <button type="button" onClick={Amplitude.play}>
          Play
        </button>
        <button type="button" onClick={Amplitude.stop}>
          Pause
        </button>
        <button
          type="button"
          onClick={() => {
            Amplitude.next(null);
          }}
        >
          Next
        </button>
      </div>
    );
  }

  formatSongs(songs) {
    return songs.map(song => {
      return {
        name: song.name,
        artist: song.artist,
        album: song.album,
        url: song.songUrl,
        cover_art_url: song.coverArtUrl
      };
    });
  }

  async handleSongChange() {
    const song = await Amplitude.getActiveSongMetadata();
    this.props.setActiveSong(song);
  }

  handleStop() {
    this.props.setActiveSong(null);
  }
}

const mapState = state => {
  return {
    tapeSongs: state.tapeSongs,
    activeSong: state.songCurrentlyPlaying
  };
};

const mapDispatch = dispatch => {
  return {
    fetchCurrPlaylist: id => dispatch(fetchCurrPlaylist(id)),
    setActiveSong: song => dispatch(setActiveSong(song))
  };
};

export default connect(mapState, mapDispatch)(Player);
