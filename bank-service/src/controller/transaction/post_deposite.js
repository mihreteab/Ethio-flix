export default function makePostDeposite({ txnLogic, assertType }) {
  return async function postDeposite(param) {
    if (!assertType(param.txn, "txn")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    param.txn.type = "deposite";

    let a = await txnLogic.createTransaction(
      param.user_id,
      param.account_id,
      param.txn
    );

    if (!a) {
      return {
        status: 500,
        result: {
          msg: "Failed To Create Deposite Data.",
        },
      };
    }

    return {
      status: 200,
      result: null,
    };
  };
}
