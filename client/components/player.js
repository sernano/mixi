import React from 'react';
import {connect} from 'react-redux';
import Amplitude from 'amplitudejs';
import {fetchCurrPlaylist} from '../store/curr-tape';

export class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      playing: false,
      track: null
    };
  }
  async componentDidMount() {
    await this.props.fetchCurrPlaylist(this.props.match.params.tapeId);
    const songs = this.formatSongs(this.props.tapeSongs);
    Amplitude.init({songs: songs});
  }

  componentDidUpdate() {
    //Amplitude.bindNewElements();
  }

  componentWillUnmount() {}

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
        <button type="button" onClick={Amplitude.play}>
          Play
        </button>
        <button type="button" onClick={Amplitude.stop}>
          Pause
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
}

const mapState = state => {
  return {
    tapeSongs: state.tapeSongs
  };
};

const mapDispatch = dispatch => {
  return {
    fetchCurrPlaylist: id => dispatch(fetchCurrPlaylist(id))
  };
};

export default connect(mapState, mapDispatch)(Player);
