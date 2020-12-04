export default function makeFindUser({ movieDB }) {
  return async function findUser(user_id) {
    let u = await movieDB.readUser({ user_id }, null);

    if (!u.length) {
      return 0;
    }

    return u[0].pii;
  };
}
