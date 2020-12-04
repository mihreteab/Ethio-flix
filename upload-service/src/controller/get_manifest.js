export default function makeGetManifest({ movieFileLogic, assertType }) {
  return async function getManifest(param, cb) {
    // if (!assertType(param.mid, "mid")) {
    //   return {
    //     status: 400,
    //     result: {
    //       msg: "Invalid Request.",
    //     },
    //   };
    // }


    let m = await movieFileLogic.readManifest(
      `./public/videos/${param.id}.m3u8`,
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

