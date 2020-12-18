import uploadFile from "../tools/upload";

export default function makeUploadMovie({ movieFileLogic, assertType }) {
  return async function uploadMovie(param) {
    if (!assertType(param.mid, "mid")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Input.",
        },
      };
    }
    console.log(param);
    let m = await movieFileLogic.saveMovieFile(param.path, param.mid);

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
