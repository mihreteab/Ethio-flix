export default function makePostWithdrawal({ txnLogic, assertType }) {
  return async function postWithdrawal(param) {
    if (!assertType(param.txn, "txn")) {
      return {
        status: 400,
        result: {
          msg: "Invalid Request.",
        },
      };
    }

    param.txn.type = "withdrawal";

    let balance = await txnLogic.calBalance(param.user_id, param.account_id);

    if (balance < param.txn.amount) {
      return {
        status: 200,
        result: {
          msg: "Insufficient Balance.",
        },
      };
    }

    let a = await txnLogic.createTransaction(
      param.user_id,
      param.account_id,
      param.txn
    );

    if (!a) {
      return {
        status: 500,
        result: {
          msg: "Failed To Make Withdrawal.",
        },
      };
    }

    return {
      status: 200,
      result: null,
    };
  };
}
