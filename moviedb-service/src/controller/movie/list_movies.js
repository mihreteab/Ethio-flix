export default function makeListMovies({ movieLogic, assertType }) {
  return async function listMovies(param) {
    if (!assertType(param.pagin, "pagin")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    let m = await movieLogic.listMovies();

    if (!m) {
      return {
        status: 404,
        result: {
          msg: "Couldn't list movies.",
        },
      };
    }

    return {
      status: 200,
      result: {
        movies: m,
      },
    };
  };
}

