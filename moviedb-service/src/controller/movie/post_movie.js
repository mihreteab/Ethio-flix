export default function makePostMovie({ movieLogic, assertType }) {
  return async function postMovie(param) {
    if (!assertType(param.md, "md")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    let m = await movieLogic.createMovie(param.producer, param.md);

    if (!m) {
      return {
        status: 500,
        result: {
          msg: "Failed To Save Movie Data.",
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
