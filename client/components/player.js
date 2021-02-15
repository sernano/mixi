import React from 'react';
import {connect} from 'react-redux';
import Amplitude from 'amplitudejs';
import {fetchActiveTape} from '../store/active-tape';
import {setActiveSong} from '../store/active-song';
import {Row, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      playing: false
    };
    this.playPause = this.playPause.bind(this);
    this.handleSongChange = this.handleSongChange.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchActiveTape(this.props.match.params.tapeId);
    const songs = this.formatSongs(this.props.activeTape);
    Amplitude.init({
      songs: songs,
      callbacks: {
        song_change: this.handleSongChange,
        stop: this.handleStop
      }
    });
    this.loadTape();
  }

  componentWillUnmount() {
    Amplitude.stop();
  }

  render() {
    return this.props.activeSong ? this.renderPlayer() : this.renderLoading();
  }

  renderPlayer() {
    const activeSong = this.props.activeSong;
    const coverArtUrl = activeSong.cover_art_url;
    const artistName = activeSong.artist;
    const albumName = activeSong.album;
    const songName = activeSong.name;
    return (
      <Row>
        <Col className="text-center">
          <img className="img-fluid mb-4 mt-md-5" src={coverArtUrl} />
          <br />
          <h6 className="text-center mb-0">
            {artistName} - {songName}
          </h6>
          <h6 className="text-center mb-4">{albumName}</h6>
          <input
            type="range"
            className="amplitude-song-slider w-50"
            step=".1"
          />
          <div id="player-controls">
            <br />
            <span className="h1">
              <FontAwesomeIcon
                icon="fast-backward"
                className="mr-4 player-controls"
                onClick={() => {
                  Amplitude.prev(null);
                }}
              />
              {this.state.playing ? (
                <FontAwesomeIcon
                  icon="pause"
                  className="mr-4 player-controls"
                  onClick={this.playPause}
                />
              ) : (
                <FontAwesomeIcon
                  icon="play"
                  className="mr-4 player-controls"
                  onClick={this.playPause}
                />
              )}
              <FontAwesomeIcon
                icon="fast-forward"
                className="player-controls"
                onClick={() => {
                  Amplitude.next(null);
                }}
              />
            </span>
          </div>
        </Col>
      </Row>
    );
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  playPause() {
    if (this.state.playing) {
      this.setState({
        playing: false
      });
      Amplitude.pause();
    } else {
      this.setState({
        playing: true
      });
      Amplitude.play();
    }
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

  async loadTape() {
    const song = await Amplitude.getActiveSongMetadata();
    this.props.setActiveSong(song);
  }

  async handleSongChange() {
    const song = await Amplitude.getActiveSongMetadata();
    this.props.setActiveSong(song);
    this.setState({
      playing: true
    });
  }

  handleStop() {
    this.setState({
      playing: false
    });
    this.props.setActiveSong(null);
  }
}

const mapState = state => {
  return {
    activeTape: state.activeTape,
    activeSong: state.activeSong
  };
};

const mapDispatch = dispatch => {
  return {
    fetchActiveTape: id => dispatch(fetchActiveTape(id)),
    setActiveSong: song => dispatch(setActiveSong(song))
  };
};

export default connect(mapState, mapDispatch)(Player);
