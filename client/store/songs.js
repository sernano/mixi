import axios from 'axios';
import Amplitude from 'amplitudejs';

// Action Types
const SET_SONGS = 'SET_SONGS';
const ADD_SONG = 'ADD_SONG';

// Action Creators
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

// Thunks
export const postSong = song => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/songs', song);
      dispatch(addSong(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const fetchAllSongs = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/songs');
      dispatch(setSongs(data));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = [];

export default function songs(state = initialState, action) {
  switch (action.type) {
    case SET_SONGS:
      return action.songs;
    case ADD_SONG:
      return [...state.songs, action.song];
    default:
      return state;
  }
}
