export default function makeRemoveUser({ movieDB }) {
  return async function removeUser(user_id) {
    let u = await movieDB.readUser({ user_id }, null);

    if (u.length != 1) {
      return 0;
    }

    await movieDB.deleteUser({ user_id });

    return u[0];
  };
}
