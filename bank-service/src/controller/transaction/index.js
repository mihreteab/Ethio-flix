//import factory modules
import makePostDeposite from "./post_deposite";
import makeGetBalance from "./get_balance";
import makePostWithdrawal from "./post_withdrawal";

//import dependencies
import txnLogic from "../../usecase/transaction/index";

//fix me!! this is just a stub assertion function
const assertType = (data, type) => {
  return true;
};

//dependency injection
const postDeposite = makePostDeposite({ txnLogic, assertType });
const postWithdrawal = makePostWithdrawal({ txnLogic, assertType });
const getBalance = makeGetBalance({ txnLogic, assertType });

export default {
  postDeposite,
  postWithdrawal,
  getBalance,
};
