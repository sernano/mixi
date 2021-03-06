/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar';
export {default as UserHome} from './user-home';
export {default as Player} from './player';
export {default as UploadSongs} from './upload-songs';
export {default as MyTapes} from './my-tapes';
export {default as MakeTape} from './make-tape';
export {default as EditTape} from './edit-tape';
export {Login, Signup} from './auth-form';
