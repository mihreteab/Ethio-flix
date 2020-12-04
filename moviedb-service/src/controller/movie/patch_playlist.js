export default function makePatchPlaylist({ movieLogic, assertType }) {
  return async function patchPlaylist(param) {
    if (!assertType(param.pid, "pid")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    let p = await movieLogic.findPlaylist(param.pid);

    if (!p) {
      return {
        status: 404,
        result: {
          msg: "Playlist Could Not Be Found.",
        },
      };
    }
    console.log(param);

    let u = await movieLogic.modifyPlaylist(param.pid, param.movie);

    return {
      status: 200,
      result: {
        playlist: u,
      },
    };
  };
}
