import React from 'react';
import {connect} from 'react-redux';
import {fetchAllSongs, deleteSong} from '../store/songs';
import {
  postPlaylistToSong,
  fetchCurrPlaylist,
  removeSongFromTape
} from '../store/curr-tape';

class EditTape extends React.Component {
  constructor() {
    super();
    this.handleAddSong = this.handleAddSong.bind(this);
    this.handleRemoveSong = this.handleRemoveSong.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllSongs();
    this.props.fetchCurrPlaylist(parseInt(this.props.match.params.tapeId));
  }

  render() {
    const idsInPlaylist = this.props.tape.map(song => {
      return song.id;
    });
    const mySongs = this.props.songs.filter(song => {
      return !idsInPlaylist.includes(song.id);
    });
    return (
      <>
        <h2>Edit Tape</h2>
        <div className="split-container">
          <div>
            <h3>My Songs</h3>
            {mySongs.map(song => {
              return (
                <div key={song.id}>
                  <h5>
                    {song.artist} - {song.name}{' '}
                    <a
                      href="#"
                      onClick={() => this.handleAddSong(song, song.id)}
                    >
                      +
                    </a>{' '}
                    <a href="#" onClick={() => this.props.deleteSong(song.id)}>
                      -
                    </a>
                  </h5>
                </div>
              );
            })}
          </div>
          <div className="tape-playlist-container">
            <h3>Tape Playlist</h3>
            {this.props.tape.map(song => {
              return (
                <div key={song.id}>
                  <h5>
                    {song.artist} - {song.name}{' '}
                    <a
                      href="#"
                      onClick={() => this.handleRemoveSong(song, song.id)}
                    >
                      -
                    </a>
                  </h5>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  formatSongFactory(songId, tapeId, songOrder) {
    return {
      songId: songId,
      playlistId: tapeId,
      playlistOrder: songOrder
    };
  }

  handleAddSong(song, songId) {
    const songInfo = this.formatSongFactory(
      songId,
      parseInt(this.props.match.params.tapeId),
      this.props.tape.length + 1
    );
    this.props.postPlaylistToSong(song, songInfo);
  }

  handleRemoveSong(song, songId) {
    const songInfo = this.formatSongFactory(
      songId,
      parseInt(this.props.match.params.tapeId),
      null
    );
    this.props.removeSongFromTape(song, songInfo);
  }
}

const mapState = state => {
  return {
    songs: state.songs,
    tape: state.tapeSongs
  };
};

const mapDispatch = dispatch => {
  return {
    fetchAllSongs: () => dispatch(fetchAllSongs()),
    deleteSong: id => dispatch(deleteSong(id)),
    postPlaylistToSong: (song, playlistInfo) =>
      dispatch(postPlaylistToSong(song, playlistInfo)),
    fetchCurrPlaylist: id => dispatch(fetchCurrPlaylist(id)),
    removeSongFromTape: (song, playlistInfo) =>
      dispatch(removeSongFromTape(song, playlistInfo))
  };
};

export default connect(mapState, mapDispatch)(EditTape);
