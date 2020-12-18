export default function makeModifyPassword({ userDB }) {
  return async function modifyPassword(user_id, curPassword, newPassword) {
    let u = await userDB.readUser({ user_id }, null);

    if (u.length != 1) {
      return 0;
    }

    if(!auth.comparePassword(curPassword, u[0].security.password)){
      return 0;
    }

    let hashedPasswd = auth.hashPassword(newPassword);

    await userDB.updateUser({ user_id }, hashedPasswd, "password" );

    return 1;
  };
}
