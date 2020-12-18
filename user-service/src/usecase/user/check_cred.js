export default function makeCheckCred({ userDB, auth }) {
  return async function checkCred({ email, password }) {
    let u = await userDB.readUser({ email }, null);
    console.log(password)
    if (!u.length) {
      return 0;
    }

    if(!auth.comparePassword(password, u[0].security.password)){
      return 0;
    }

    delete u.security;

    return u[0];
  };
}
