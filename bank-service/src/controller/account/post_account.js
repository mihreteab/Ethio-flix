export default function makePostAccount({ accountLogic, assertType }) {
  return async function postAccount(param) {
    if (!assertType(param.scheme, "scheme")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    let a = await accountLogic.createAccount(param.user_id, param.scheme);

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
