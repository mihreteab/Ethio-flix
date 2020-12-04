//import factory modules
import makePostAccount from "./post_account";
import makeGetAccount from "./get_account";
import makePatchAccount from "./patch_account";
import makeDeleteAccount from "./delete_account";

//import dependencies
import accountLogic from "../../usecase/account/index";

//fix me!! this is just a stub assertion function
const assertType = (data, type) => {
  return true;
};

//dependency injection
const postAccount = makePostAccount({ accountLogic, assertType });
const getAccount = makeGetAccount({ accountLogic, assertType });
const patchAccount = makePatchAccount({ accountLogic, assertType });
const deleteAccount = makeDeleteAccount({ accountLogic, assertType });

export default {
  postAccount,
  getAccount,
  patchAccount,
  deleteAccount,
};
