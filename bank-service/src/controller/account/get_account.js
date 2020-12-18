export default function makeGetAccount({ accountLogic, assertType }) {
  return async function getAccount(param) {
    if (!assertType(param.account_id, "account_id")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    let a = await accountLogic.findAccount(param.account_id);

    if (!a) {
      return {
        status: 404,
        result: {
          msg: "Account Couldn't Be Found.",
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
