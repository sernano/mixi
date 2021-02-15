import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import songs from './songs';
import tapes from './tapes';
import activeTape from './active-tape';
import activeSong from './active-song';

const reducer = combineReducers({
  user,
  songs,
  tapes,
  activeTape,
  activeSong
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
