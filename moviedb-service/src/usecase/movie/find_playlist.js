export default function makeFindPlaylist({ movieDB }) {
  return async function findPlaylist(pid) {
    let pl = await movieDB.readPlaylist({ pid: pid }, null);

    if (!pl.length) {
      return 0;
    }

    return pl[0];
  };
}
