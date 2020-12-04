export default function makeDeleteUser({ userLogic, assertType }) {
  return async function deleteUser(param) {
    if (!assertType(param.user_id, "user_id")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    let u = await userLogic.removeUser(param.user_id);

    if (!u) {
      return {
        status: 500,
        result: {
          msg: "User couldn't be deleted.",
        },
      };
    }

    return {
      status: 200,
      result: null
    };
  };
}
