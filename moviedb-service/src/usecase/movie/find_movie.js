export default function makeFindMovie({ movieDB }) {
  return async function findMovie(mid) {
    let m = await movieDB.readMovie({ mid: mid }, null);

    if (!m.length) {
      return 0;
    }

    return m[0];
  };
}
