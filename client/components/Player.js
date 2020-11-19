import React from 'react';
import {connect} from 'react-redux';
import Amplitude from 'amplitudejs';
import {fetchAllSongs} from '../store/songs';

export class Player extends React.Component {
  async componentDidMount() {
    await this.props.fetchAllSongs();
    const songs = this.formatSongs(this.props.songs);
    Amplitude.init({songs: songs});
  }

  render() {
    return (
      <div>
        <button type="button" onClick={Amplitude.play}>
          Play
        </button>
        <button type="button" onClick={Amplitude.stop}>
          Stop
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
    songs: state.songs
  };
};

const mapDispatch = dispatch => {
  return {
    fetchAllSongs: () => dispatch(fetchAllSongs())
  };
};

export default connect(mapState, mapDispatch)(Player);
