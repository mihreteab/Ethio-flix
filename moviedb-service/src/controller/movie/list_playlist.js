export default function makeListPlaylist({ movieLogic, assertType }) {
  return async function listPlaylist(param) {
    if (!assertType(param.user_id, "user_id")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    let pl = await movieLogic.listPlaylist(param.user_id);

    if (!pl) {
      return {
        status: 404,
        result: {
          msg: "Playlist Couldn't Be Found.",
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
