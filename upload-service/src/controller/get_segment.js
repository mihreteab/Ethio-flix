export default function makeGetSegment({ movieFileLogic, assertType }) {
  return async function getSegment(param, cb) {
    // if (!assertType(param.mid, "mid")) {
    //   return {
    //     status: 400,
    //     result: {
    //       msg: "Invalid Request.",
    //     },
    //   };
    // }
    console.log(param)

    let m = await movieFileLogic.readSegment(`./public/videos/${param.path}`, cb);
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
