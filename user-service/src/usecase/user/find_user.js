export default function makeFindUser({ userDB }) {
  return async function findUser(user_id) {
    let u = await userDB.readUser({ user_id }, null);

    if (!u.length) {
      return 0;
    }

    return u[0].pii;
  };
}
