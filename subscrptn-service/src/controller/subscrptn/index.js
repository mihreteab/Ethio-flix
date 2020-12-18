//import factory modules
import makePostSubscrptn from "./post_subscrptn";
import makeGetSubscrptn from "./get_subscrptn";
import makePatchSubscrptn from "./patch_subscrptn";
import makeDeleteSubscrptn from "./delete_account";

//import dependencies
import subLogic from "../../usecase/subscrptn/index";

//fix me!! this is just a stub assertion function
const assertType = (data, type) => {
  return true;
};

//dependency injection
const postSubscrptn = makePostSubscrptn({ subLogic, assertType });
const getSubscrptn = makeGetSubscrptn({ subLogic, assertType });
const patchSubscrptn = makePatchSubscrptn({ subLogic, assertType });
// const deleteAccount = makeDeleteAccount({ subLogic, assertType });

export default {
  postSubscrptn,
  getSubscrptn,
  patchSubscrptn,
  // deleteAccount,
};
