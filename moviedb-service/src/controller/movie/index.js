//import factory modules
import makePostMovie from "./post_movie";
import makeGetMovie from "./get_movie";
import makePatchMovie from "./patch_movie";
import makeDeleteMovie from "./delete_movie";

import makeGetPlaylist from "./get_playlist";
import makeListPlaylist from "./list_playlist";
import makePostPlaylist from "./post_playlist";
import makePatchPlaylist from "./patch_playlist";

//import dependencies
import movieLogic from "../../usecase/movie/index";

//fix me!! this is just a stub assertion function
const assertType = (data, type) => {
  return true;
};

//dependency injection
const postMovie = makePostMovie({ movieLogic, assertType });
const getMovie = makeGetMovie({ movieLogic, assertType });
const patchMovie = makePatchMovie({ movieLogic, assertType });
const deleteMovie = makeDeleteMovie({ movieLogic, assertType });

const postPlaylist = makePostPlaylist({ movieLogic, assertType });
const getPlaylist = makeGetPlaylist({ movieLogic, assertType });
const patchPlaylist = makePatchPlaylist({ movieLogic, assertType });
const listPlaylist = makeListPlaylist({ movieLogic, assertType });

export default {
  postMovie,
  getMovie,
  patchMovie,
  deleteMovie,
  postPlaylist,
  getPlaylist,
  patchPlaylist,
  listPlaylist
};
