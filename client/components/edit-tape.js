import React from 'react';
import {connect} from 'react-redux';
import {fetchAllSongs, deleteSong} from '../store/songs';

class EditTape extends React.Component {
  componentDidMount() {
    this.props.fetchAllSongs();
  }

  render() {
    return (
      <>
        <h2>Edit Tape</h2>
        <div className="split-container">
          <div>
            <h3>My Songs</h3>
            {this.props.songs.map((song, idx) => {
              return (
                <div key={idx}>
                  <h5>
                    {song.artist} - {song.name} +{' '}
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
          </div>
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
    fetchAllSongs: () => dispatch(fetchAllSongs()),
    deleteSong: id => dispatch(deleteSong(id))
  };
};

export default connect(mapState, mapDispatch)(EditTape);
