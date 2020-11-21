import axios from 'axios';

const SET_PLAYLIST = 'SET_PLAYLIST';
const CREATE_PLAYLIST = 'CREATE_PLAYLIST';

// Action Creators
export const setPlaylist = playlists => {
  return {
    type: SET_PLAYLIST,
    playlists
  };
};

export const createPlaylist = playlist => {
  return {
    type: CREATE_PLAYLIST,
    playlist
  };
};

// Thunks
export const postPlaylist = playlist => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/playlists', playlist);
      dispatch(createPlaylist(data));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = {
  playlists: [],
  loading: true
};

export default function playlistReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PLAYLIST:
      return {
        ...state,
        playlists: [...state.playlists, action.playlist],
        loading: false
      };
    default:
      return state;
  }
}
