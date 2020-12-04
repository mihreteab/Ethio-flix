export default function makePatchMovie({ movieLogic, assertType }) {
  return async function patchMovie(param) {
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
          msg: "Movie Could Not Be Found.",
        },
      };
    }
    console.log(param);

    let u = await movieLogic.modifyMovie(param.mid, param.md);

    return {
      status: 200,
      result: {
        movie: u,
      },
    };
  };
}
