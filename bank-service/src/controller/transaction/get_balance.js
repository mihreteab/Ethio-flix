export default function makeGetBalance({ txnLogic, assertType }) {
  return async function getBalance(param) {
    if (!assertType(param.account_id, "account_id")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    let a = await txnLogic.calBalance(param.user_id, param.account_id);

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

