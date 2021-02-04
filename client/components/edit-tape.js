import React from 'react';
import {connect} from 'react-redux';
import {fetchAllSongs, deleteSong} from '../store/songs';
import {
  postPlaylistToSong,
  fetchCurrPlaylist,
  removeSongFromTape
} from '../store/curr-tape';
import {Link} from 'react-router-dom';
import {Col, Row, ListGroup, ListGroupItem} from 'react-bootstrap';

class EditTape extends React.Component {
  constructor() {
    super();
    this.handleAddSong = this.handleAddSong.bind(this);
    this.handleRemoveSong = this.handleRemoveSong.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllSongs();
    this.props.fetchCurrPlaylist(Number(this.props.match.params.tapeId));
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <h2>Edit Tape</h2>
        </Col>
        {this.tapePlaylist()}
        {this.mySongs()}
      </Row>
    );
  }

  tapePlaylist() {
    return (
      <Col md={6}>
        <h3>Tape Playlist</h3>
        <ListGroup>
          {this.props.tape.map(song => {
            return (
              <ListGroupItem key={song.id} className="default-cursor" action>
                <h6>
                  {song.artist} - {song.name}{' '}
                  <a
                    href="#"
                    onClick={() => this.handleRemoveSong(song, song.id)}
                  >
                    -
                  </a>
                </h6>
              </ListGroupItem>
            );
          })}
        </ListGroup>
        <Link to={`/player/${this.props.match.params.tapeId}`}>
          Listen to Tape
        </Link>
      </Col>
    );
  }

  mySongs() {
    const idsInPlaylist = this.props.tape.map(song => {
      return song.id;
    });
    const mySongs = this.props.songs.filter(song => {
      return !idsInPlaylist.includes(song.id);
    });
    return (
      <Col md={6}>
        <h3>My Songs</h3>
        <ListGroup>
          {mySongs.map(song => {
            return (
              <ListGroupItem key={song.id} className="default-cursor" action>
                <h6>
                  {song.artist} - {song.name}{' '}
                  <a href="#" onClick={() => this.handleAddSong(song, song.id)}>
                    +
                  </a>{' '}
                  <a href="#" onClick={() => this.props.deleteSong(song.id)}>
                    -
                  </a>
                </h6>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Col>
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
