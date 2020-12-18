export default function makeGetManifest({ cdnLogic, assertType }) {
  const VIDEOS_PATH = '/home/developer/videos/';
  return async function getManifest(param, cb) {
    // if (!assertType(param.mid, "mid")) {
    //   return {
    //     status: 400,
    //     result: {
    //       msg: "Invalid Request.",
    //     },
    //   };
    // }


    let m = await cdnLogic.readManifest(
      `${VIDEOS_PATH}${param.id}`,
      cb
    );
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

