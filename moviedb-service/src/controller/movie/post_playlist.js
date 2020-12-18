export default function makePostPlaylist({ movieLogic, assertType }) {
  return async function postPlaylist(param) {
    if (!assertType(param.movie, "mid")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }
    console.log(param);
    let pl = await movieLogic.createPlaylist(param.user_id, param.name, param.movie);

    if (!pl) {
      return {
        status: 500,
        result: {
          msg: "Failed To Save Playlist Data.",
        },
      };
    }

    return {
      status: 200,
      result: {
        playlist: pl,
      },
    };
  };
}
