import axios from 'axios';

const SET_TAPES = 'SET_TAPES';
const CREATE_TAPE = 'CREATE_TAPE';

// Action Creators
export const setTapes = tapes => {
  return {
    type: SET_TAPES,
    tapes
  };
};

export const createTape = tape => {
  return {
    type: CREATE_TAPE,
    tape
  };
};

// Thunks
export const postTape = tape => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/playlists', tape);
      dispatch(createTape(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const fetchTapes = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/playlists/user/${userId}`);
      dispatch(setTapes(data));
    } catch (err) {
      console.error(err);
    }
  };
};

const initialState = {
  tapes: [],
  loading: true
};

export default function tapes(state = initialState, action) {
  switch (action.type) {
    case SET_TAPES:
      return {...state, tapes: action.tapes, loading: false};
    case CREATE_TAPE:
      return {
        ...state,
        tapes: [...state.tapes, action.tape],
        loading: false
      };
    default:
      return state;
  }
}
