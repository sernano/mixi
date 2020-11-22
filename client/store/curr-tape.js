// State should be an array of songs that represents the current
// playlist.
//
// The + next to the songs in the library in the edit playlist view
// should add that song to the end of the current playlist.
//
// The - next to the song in the tape playlist column should remove
// the song from that playlist.
//
//
import axios from 'axios';

const SET_SONGS = 'SET_SONGS_TO_TAPE';
const ADD_SONG = 'ADD_SONG_TO_TAPE';
const REMOVE_SONG = 'REMOVE_SONG_FROM_TAPE';

const setSongs = songs => {
  return {
    type: SET_SONGS,
    songs
  };
};

const addSong = song => {
  return {
    type: ADD_SONG,
    song
  };
};

const removeSong = song => {
  return {
    type: REMOVE_SONG,
    song
  };
};

//Thunks
export const fetchCurrPlaylist = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/playlists/${id}`);
      dispatch(setSongs(data.songs));
    } catch (err) {
      console.error(err);
    }
  };
};

export const postPlaylistToSong = (song, playlistInfo) => {
  return async dispatch => {
    try {
      await axios.post('/api/playlists/newSong', playlistInfo);
      dispatch(addSong(song));
    } catch (err) {
      console.error(err);
    }
  };
};

export const removeSongFromTape = (song, playlistInfo) => {
  return async dispatch => {
    try {
      await axios.delete('/api/playlists/removeSong', {data: playlistInfo});
      dispatch(removeSong(song));
    } catch (err) {
      console.error(err);
    }
  };
};
const initialState = [];

export default function tapeSongs(state = initialState, action) {
  switch (action.type) {
    case SET_SONGS:
      return action.songs;
    case ADD_SONG:
      return [...state, action.song];
    case REMOVE_SONG:
      return [...state.filter(song => song.id !== action.song.id)];
    default:
      return state;
  }
}
