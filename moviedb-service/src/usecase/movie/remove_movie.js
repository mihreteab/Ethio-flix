export default function makeRemoveMovie({ movieDB }) {
  return async function removePatient(mid) {
    let r = await movieDB.readMovie({ mid: mid }, null);

    if (r.length != 1) {
      return 0;
    }

    await movieDB.deleteMovie({ mid: mid });

    return r[0];
  };
}
