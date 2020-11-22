import axios from 'axios';
import Amplitude from 'amplitudejs';

// Action Types
const SET_SONGS = 'SET_SONGS';
const ADD_SONG = 'ADD_SONG';
const DELETE_SONG = 'DELETE_SONG';

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

const removeSong = id => {
  return {
    type: DELETE_SONG,
    id
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

export const deleteSong = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/songs/${id}`);
      dispatch(removeSong(id));
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
      return [...state, action.song];
    case DELETE_SONG:
      return [...state.filter(song => song.id !== action.id)];
    default:
      return state;
  }
}
