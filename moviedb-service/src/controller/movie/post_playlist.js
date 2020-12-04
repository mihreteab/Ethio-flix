export default function makePostPlaylist({ movieLogic, assertType }) {
  return async function postPlaylist(param) {
    if (!assertType(param.movie, "pd")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    let pl = await movieLogic.createPlaylist(null, param.movie);

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
