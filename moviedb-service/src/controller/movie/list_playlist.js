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

    if (!pl.length) {
      return {
        status: 404,
        result: {
          msg: "Playlist Couldn't Be Found.",
        },
      };
    }

    for (let j = 0; j < pl.length; j++) {
      for (let i = 0; i < pl[j].movies.length; i++) {
        pl[j].movies[i] = await movieLogic.findMovie(pl[j].movies[i]);
      }
    }

    return {
      status: 200,
      result: {
        playlist: pl,
      },
    };
  };
}
