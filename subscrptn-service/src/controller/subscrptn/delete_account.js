export default function makeDeleteMovie({ movieLogic, assertType }) {
  return async function deleteMovie(param) {
    if (!assertType(param.mid, "mid")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    let m = await movieLogic.removeMovie(param.mid);

    if (!m) {
      return {
        status: 500,
        result: {
          msg: "Movie couldn't be deleted.",
        },
      };
    }

    return {
      status: 200,
      result: null
    };
  };
}
