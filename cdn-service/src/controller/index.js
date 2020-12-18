//import factory modules
import makeGetManifest from "./get_manifest";
import makeGetSegment from "./get_segment";
import makeGetThumb from "./get_thumb";

//import dependencies
import cdnLogic from "../usecase/movie/index";

//fix me!! this is just a stub assertion function
const assertType = (data, type) => {
  return true;
};

//dependency injection
const getManifest = makeGetManifest({ cdnLogic, assertType });
const getSegment = makeGetSegment({ cdnLogic, assertType });
const getThumb = makeGetThumb({ cdnLogic, assertType });

export default {
  getManifest,
  getSegment,
  getThumb,
};
