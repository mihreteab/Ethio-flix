export default function makeCheckCred({ movieDB, auth }) {
  return async function checkCred({ username, password }) {
    let u = await movieDB.readUser({ username }, null);
    console.log(u)
    if (!u.length) {
      return 0;
    }

    if(!auth.comparePassword(password, u[0].security.password)){
      return 0;
    }

    return u[0].user_id;
  };
}
