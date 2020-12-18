export default function makeGetAccess({ userLogic, assertType, auth }) {
  return async function getAccess(param) {
    if (
      !assertType(param.cred.password, "password") ||
      !assertType(param.cred.email, "email")
    ) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    console.log(param)

    let u = await userLogic.checkCred(param.cred);

    if (!u) {
      return {
        status: 401,
        result: {
          msg: "Incorrect email or password.",
        },
      };
    }
    console.log("hello",u)
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
