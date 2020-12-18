export default function makePostAccount({ accountLogic, assertType }) {
  return async function postAccount(param) {
    if (!assertType(param.user_id, "user_id")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    let a = await accountLogic.createAccount(param.user_id);

    if (!a) {
      return {
        status: 500,
        result: {
          msg: "Failed To Save Account Data.",
        },
      };
    }

    return {
      status: 200,
      result: {
        account: a,
      },
    };
  };
}
