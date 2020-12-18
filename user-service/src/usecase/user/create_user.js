export default function makeCreateUser({ userDB, User, generateId, moment, auth }) {
  return async function createUser({ email, password, role, pii }) {
    let hashedPswd = auth.hashPassword(password)
    let user_id = generateId(8);
    let date = moment().unix();

    let user = new User(user_id, email, hashedPswd, role, pii, date);
    console.log(user);
    let u = await userDB.readUser({ email: user.security.email }, null);

    if (u.length) {
      console.log(u)
      return null;
    }

    await userDB.writeUser(user);

    delete user.security;
    
    return user;
  };
}
