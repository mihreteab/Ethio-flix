//import factory modules
import makePostMovie from "./post_movie";
import makeGetMovie from "./get_movie";
import makePatchMovie from "./patch_movie";
import makeDeleteMovie from "./delete_movie";

//import dependencies
import movieLogic from "../usecase/movie/index";

//fix me!! this is just a stub assertion function
const assertType = (data, type) => {
  return true;
};

//dependency injection
const postMovie = makePostMovie({ movieLogic, assertType });
const getMovie = makeGetMovie({ movieLogic, assertType });
const patchMovie = makePatchMovie({ movieLogic, assertType });
const deleteMovie = makeDeleteMovie({ movieLogic, assertType });

export default {
  postMovie,
  getMovie,
  patchMovie,
  deleteMovie,
};
