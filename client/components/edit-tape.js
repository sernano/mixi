import React from 'react';
import {connect} from 'react-redux';
import {fetchAllSongs} from '../store/songs';

class EditTape extends React.Component {
  componentDidMount() {
    this.props.fetchAllSongs();
  }

  render() {
    return (
      <>
        <h2>Edit Tape</h2>
        <div className="list-songs-container">
          <h3>My Songs</h3>
          {this.props.songs.map((song, idx) => {
            return (
              <div key={idx}>
                <h5>
                  {song.artist} - {song.name}
                </h5>
              </div>
            );
          })}
        </div>
        <div className="tape-playlist-container">
          <h3>Tape Playlist</h3>
        </div>
      </>
    );
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

export default connect(mapState, mapDispatch)(EditTape);
