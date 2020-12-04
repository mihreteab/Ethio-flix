export default function makeGetSegment({ cdnLogic, assertType }) {
  const VIDEOS_PATH = "/home/developer/videos/";
  return async function getSegment(param, cb) {
    // if (!assertType(param.mid, "mid")) {
    //   return {
    //     status: 400,
    //     result: {
    //       msg: "Invalid Request.",
    //     },
    //   };
    // }

    let m = await cdnLogic.readSegment(`${VIDEOS_PATH}${param.path}`, cb);
    if (!m) {
      return {
        status: 404,
        result: {
          msg: "Movie Couldn't Be Found.",
        },
      };
    }

    return {
      status: 200,
    };
  };
}
