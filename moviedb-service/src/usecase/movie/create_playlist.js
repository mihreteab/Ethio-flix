export default function makeCreatePlaylist({
  movieDB,
  Playlist,
  generateId,
  moment,
}) {
  return async function createPlaylist(user_id, name, movie) {
    let pid = generateId(8);
    let date = moment().unix();

    let playlist = new Playlist(user_id, name, movie, pid, date);

    let p = await movieDB.readPlaylist({ pid: playlist.pid });
    if (p.length) {
      return null;
    }

    await movieDB.writePlaylist(playlist);

    return playlist;
  };
}
