const SET_SONG = 'SET_ACTIVE_SONG';

const setSong = song => {
  return {
    type: SET_SONG,
    song
  };
};

// Thunks
export const setActiveSong = song => {
  return dispatch => {
    dispatch(setSong(song));
  };
};

const initialState = null;

export default function songCurrentlyPlaying(state = initialState, action) {
  switch (action.type) {
    case SET_SONG:
      return action.song;
    default:
      return state;
  }
}
