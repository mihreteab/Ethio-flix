export default function makePatchUser({ userLogic, assertType }) {
  return async function patchUser(param) {
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
          msg: "User Could Not Be Found.",
        },
      };
    }
    console.log(param);

    let updated = await userLogic.modifyUser(param.user_id, param.pii, "pii");

    return {
      status: 200,
      result: {
        user: updated,
      },
    };
  };
}
