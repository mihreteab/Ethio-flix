export default function makeCreateUser({ movieDB, User, generateId, moment, auth }) {
  return async function createUser({ email, username, password, role, pii }) {
    let hashedPswd = auth.hashPassword(password)
    let user_id = generateId(8);
    let date = moment().unix();

    let user = new User(user_id, email, username, hashedPswd, role, pii, date);

    let u = await movieDB.readUser({ user_id: user.user_id });

    if (u.length) {
      return null;
    }

    await movieDB.writeUser(user);

    return user.pii;
  };
}
