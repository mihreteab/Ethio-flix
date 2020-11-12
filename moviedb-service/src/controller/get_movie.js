export default function makeGetMovie({ movieLogic, assertType }) {
  return async function get_patient(param) {
    if (!assertType(param.mid, "mid")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    let m = await movieLogic.findMovie(param.mid);

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
      result: {
        movie: m,
      },
    };
  };
}

