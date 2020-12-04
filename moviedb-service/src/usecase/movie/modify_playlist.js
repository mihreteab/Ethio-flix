export default function makeModifyPlaylist({ movieDB }) {
  return async function modifyPlaylist(pid, movie) {
    let u = await movieDB.readPlaylist({ pid: pid }, null);

    if (u.length != 1) {
      return 0;
    }

    u[0].movies.push(movie);

    await movieDB.updatePlaylist({ pid: pid }, u[0]);

    return u;
  };
}
