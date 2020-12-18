export default function makeGetBalance({ txnLogic, assertType }) {
  return async function getBalance(param) {
    if (!assertType(param.user_id, "user_id")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    let b = await txnLogic.calBalance(param.user_id);

    if (!b) {
      return {
        status: 200,
        result: {
          balance: 0.00,
        },
      };
    }

    return {
      status: 200,
      result: {
        balance: b,
      },
    };
  };
}
