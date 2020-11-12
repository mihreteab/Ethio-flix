//import factory modules
import makeUploadMovie from "./upload_movie";
import makeGetMovie from "./get_movie";
import makePatchMovie from "./patch_movie";
import makeDeleteMovie from "./delete_movie";

//import dependencies
import movieFileLogic from "../usecase/movie/index";

//fix me!! this is just a stub assertion function
const assertType = (data, type) => {
  return true;
};

//dependency injection
const uploadMovie = makeUploadMovie({ movieFileLogic, assertType });
const getMovie = makeGetMovie({ movieFileLogic, assertType });
const patchMovie = makePatchMovie({ movieFileLogic, assertType });
const deleteMovie = makeDeleteMovie({ movieFileLogic, assertType });

export default {
  uploadMovie,
  getMovie,
  patchMovie,
  deleteMovie,
};
