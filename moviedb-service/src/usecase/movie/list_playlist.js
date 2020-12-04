export default function makeListPlaylist({ movieDB }) {
  return async function listPlaylist(user_id) {
    let pl = await movieDB.readPlaylist({ user_id }, null);

    if (!pl.length) {
      return 0;
    }

    return pl;
  };
}
