export default function makeModifyMovie({ movieDB }) {
  return async function modifyMovie(mid, md) {
    let u = await movieDB.readMovie({ mid: mid }, null);

    if (u.length != 1) {
      return 0;
    }

    u[0].md = md;

    await movieDB.updateMovie({ mid: mid }, u[0]);

    return u;
  };
}
