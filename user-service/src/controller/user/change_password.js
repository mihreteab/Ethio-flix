export default function makeChangePassword({ userLogic, assertType }) {
  return async function changePassword(param) {
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

    let updated = await userLogic.modifyPassword(
      param.user_id,
      param.curPassword,
      param.newPassword
    );

    if (!updated) {
      return {
        status: 400,
        result: {
          msg: `Incorrect Old Password.`,
        },
      };
    }

     return {
       status: 200,
       result: {
         msg: `Password Changed Successfully.`,
       },
     };
  };
}
