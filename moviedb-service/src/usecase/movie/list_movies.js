export default function makeListsMovies({ movieDB }) {
  return async function listMovies() {
    let m = await movieDB.readMovie({}, null);

    if (!m.length) {
      return 0;
    }

    return m;
  };
}
