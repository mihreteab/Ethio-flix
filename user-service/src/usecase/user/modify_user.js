export default function makeModifyUser({ movieDB }) {
  return async function modifyUser(user_id, data, field) {
    let u = await movieDB.readUser({ user_id }, null);

    if (u.length != 1) {
      return 0;
    }

    await movieDB.updateUser({ user_id }, data, field );

    return u;
  };
}
