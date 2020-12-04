export default function makePostMovie({ userLogic, assertType, auth }) {
  return async function postMovie(param) {
    if (!assertType(param.user.pii, "pii")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    let u = await userLogic.createUser(param.user);

    if (!u) {
      return {
        status: 500,
        result: {
          msg: "Failed To Sign Up.",
        },
      };
    }

    let token = await auth.createToken({
      user_id: u.user_id,
      role: u.role
    })

    return {
      status: 200,
      result: {
        user: u,
        token: token
      },
    };
  };
}
