import React from 'react';
import {connect} from 'react-redux';
import {fetchTapes} from '../store/tapes';
import {fetchAllSongs, deleteSong} from '../store/songs';
import {
  postPlaylistToSong,
  fetchActiveTape,
  removeSongFromTape
} from '../store/active-tape';
import {Link} from 'react-router-dom';
import {Col, Row, ListGroup, ListGroupItem} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class EditTape extends React.Component {
  constructor() {
    super();
    this.handleAddSong = this.handleAddSong.bind(this);
    this.handleRemoveSong = this.handleRemoveSong.bind(this);
  }

  componentDidMount() {
    this.props.fetchTapes(this.props.user.id);
    this.props.fetchAllSongs();
    this.props.fetchActiveTape(Number(this.props.match.params.tapeId));
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <Link to={`/player/${this.props.match.params.tapeId}`}>
            <span className="h2">
              {this.findTape(this.props.tapes)} - Play Now
            </span>{' '}
            <span className="h4 ml-2">
              <FontAwesomeIcon icon="play" />
            </span>
          </Link>
        </Col>
        {this.tapePlaylist()}
        {this.mySongs()}
      </Row>
    );
  }

  tapePlaylist() {
    return (
      <Col md={6} className="mt-4">
        <h3 className="mb-3">Tape Playlist</h3>
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
                    <span className="h6">
                      <FontAwesomeIcon icon="minus-circle" />
                    </span>
                  </a>
                </h6>
              </ListGroupItem>
            );
          })}
        </ListGroup>
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
      <Col md={6} className="mt-4">
        <h3 className="mb-3">Song Library</h3>
        <ListGroup>
          {mySongs.map(song => {
            return (
              <ListGroupItem key={song.id} className="default-cursor" action>
                <h6>
                  {song.artist} - {song.name}{' '}
                  <a href="#" onClick={() => this.handleAddSong(song, song.id)}>
                    <span className="h6">
                      <FontAwesomeIcon icon="plus-circle" />
                    </span>
                  </a>{' '}
                  <a href="#" onClick={() => this.props.deleteSong(song.id)}>
                    <span className="h6">
                      <FontAwesomeIcon icon="minus-circle" />
                    </span>
                  </a>
                </h6>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Col>
    );
  }

  findTape(tapes) {
    const activeTape = tapes.filter(
      tape => tape.id === Number(this.props.match.params.tapeId)
    );
    return activeTape[0] ? activeTape[0].title : '';
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
      Number(this.props.match.params.tapeId),
      this.props.tape.length + 1
    );
    this.props.postPlaylistToSong(song, songInfo);
  }

  handleRemoveSong(song, songId) {
    const songInfo = this.formatSongFactory(
      songId,
      Number(this.props.match.params.tapeId),
      null
    );
    this.props.removeSongFromTape(song, songInfo);
  }
}

const mapState = state => {
  return {
    songs: state.songs,
    tape: state.tapeSongs,
    tapes: state.tapes.tapes,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    fetchAllSongs: () => dispatch(fetchAllSongs()),
    fetchTapes: userId => dispatch(fetchTapes(userId)),
    deleteSong: id => dispatch(deleteSong(id)),
    postPlaylistToSong: (song, playlistInfo) =>
      dispatch(postPlaylistToSong(song, playlistInfo)),
    fetchActiveTape: id => dispatch(fetchActiveTape(id)),
    removeSongFromTape: (song, playlistInfo) =>
      dispatch(removeSongFromTape(song, playlistInfo))
  };
};

export default connect(mapState, mapDispatch)(EditTape);
