import axios from 'axios';

// Action Types
const ADD_SONG = 'ADD_SONG';

// Action Creators
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

const initialState = [];

export default function songs(state = initialState, action) {
  switch (action.type) {
    case ADD_SONG:
      return [...state.songs, action.song];
    default:
      return state;
  }
}
