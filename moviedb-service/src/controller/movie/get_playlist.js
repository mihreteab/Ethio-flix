export default function makeGetPlaylist({ movieLogic, assertType }) {
  return async function getPlaylist(param) {
    if (!assertType(param.pid, "pid")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    let pl = await movieLogic.findPlaylist(param.pid);

    if (!pl) {
      return {
        status: 404,
        result: {
          msg: "Playlist Couldn't Be Found.",
        },
      };
    }


    for (let i = 0; i < pl.movies.length; i++) {
      pl.movies[i] = await movieLogic.findMovie(pl.movies[i]);
    }

    return {
      status: 200,
      result: {
        playlist: pl,
      },
    };
  };
}
