export default function makeGetUser({ userLogic, assertType }) {
  return async function getUser(param) {
    if (!assertType(param.user_id, "user_id")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    let u = await userLogic.findUser(param.user_id);

    if (!u) {
      return {
        status: 404,
        result: {
          msg: "User Couldn't Be Found.",
        },
      };
    }

    return {
      status: 200,
      result: {
        user: u,
      },
    };
  };
}

