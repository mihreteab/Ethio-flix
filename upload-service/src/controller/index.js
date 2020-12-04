//import factory modules
import makeUploadMovie from "./upload_movie";
import makeGetManifest from "./get_manifest";
import makeGetSegment from "./get_segment";
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
const getManifest = makeGetManifest({ movieFileLogic, assertType });
const getSegment = makeGetSegment({ movieFileLogic, assertType });
const patchMovie = makePatchMovie({ movieFileLogic, assertType });
const deleteMovie = makeDeleteMovie({ movieFileLogic, assertType });

export default {
  uploadMovie,
  getManifest,
  getSegment,
  patchMovie,
  deleteMovie,
};
