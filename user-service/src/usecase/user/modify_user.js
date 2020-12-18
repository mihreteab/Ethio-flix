export default function makeModifyUser({ userDB }) {
  return async function modifyUser(user_id, data, field) {
    let u = await userDB.readUser({ user_id }, null);

    if (u.length != 1) {
      return 0;
    }

    await userDB.updateUser({ user_id }, data, field );

    return u;
  };
}
