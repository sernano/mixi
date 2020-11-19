import axios from 'axios';

const SET_PLAYLIST = 'SET_PLAYLIST';
const ADD_PLAYLIST = 'ADD_PLAYLIST';

// Action Creators
export const setPlaylist = playlists => {
  return {
    type: SET_PLAYLIST,
    playlists
  };
};

export const addPlaylist = id => {
  return {
    type: ADD_PLAYLIST,
    id
  };
};
