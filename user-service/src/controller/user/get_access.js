export default function makeGetAccess({ userLogic, assertType, auth }) {
  return async function getAccess(param) {
    if (
      !assertType(param.cred.password, "password") ||
      !assertType(param.cred.username, "username")
    ) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    let u = await userLogic.checkCred(param.cred);

    if (!u) {
      return {
        status: 400,
        result: {
          msg: "Incorrect username or password.",
        },
      };
    }

    let token = await auth.createToken({
      user_id: u.user_id,
      role: u.role,
    });

    return {
      status: 200,
      result: {
        user: u,
        token: token,
      },
    };
  };
}
