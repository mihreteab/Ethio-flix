//import factory modules
import makeGetManifest from "./get_manifest";
import makeGetSegment from "./get_segment";

//import dependencies
import cdnLogic from "../usecase/movie/index";

//fix me!! this is just a stub assertion function
const assertType = (data, type) => {
  return true;
};

//dependency injection
const getManifest = makeGetManifest({ cdnLogic, assertType });
const getSegment = makeGetSegment({ cdnLogic, assertType });

export default {
  getManifest,
  getSegment,
};
