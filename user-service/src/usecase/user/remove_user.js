export default function makeRemoveUser({ userDB }) {
  return async function removeUser(user_id) {
    let u = await userDB.readUser({ user_id }, null);

    if (u.length != 1) {
      return 0;
    }

    await userDB.deleteUser({ user_id });

    return u[0];
  };
}
