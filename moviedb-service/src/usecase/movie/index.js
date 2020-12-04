//import library dependencies
import moment from 'moment'

//import factory modules
import makeCreateMovie from "./create_movie";
import makeFindMovie from "./find_movie";
import makeModifyMovie from "./modify_movie";
import makeRemoveMovie from "./remove_movie";

import makeCreatePlaylist from "./create_playlist";
import makeFindPlaylist from "./find_playlist";
import makeModifyPlaylist from "./modify_playlist";
import makeListPlaylist from "./list_playlist";

//import code dependencies
import Movie from "../../entity/movie";
import Playlist from "../../entity/playlist";
import { movieDB } from "../../datastore/db/index";
import { generateId } from "../../tools/utils";

//dependency injection
const createMovie = makeCreateMovie({ movieDB, Movie, generateId, moment });
const findMovie = makeFindMovie({ movieDB });
const modifyMovie = makeModifyMovie({ movieDB });
const removeMovie = makeRemoveMovie({ movieDB });

const createPlaylist = makeCreatePlaylist({ movieDB, Playlist, generateId, moment });
const findPlaylist = makeFindPlaylist({ movieDB });
const modifyPlaylist = makeModifyPlaylist({ movieDB });
const listPlaylist = makeListPlaylist({ movieDB });

export default {
  createMovie,
  findMovie,
  modifyMovie,
  removeMovie,
  createPlaylist,
  findPlaylist,
  modifyPlaylist,
  listPlaylist,
};
