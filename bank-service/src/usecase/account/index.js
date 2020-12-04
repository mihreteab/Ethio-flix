//import library dependencies
import moment from 'moment'

//import factory modules
import makeCreateAccount from "./create_account";
import makeFindAccount from "./find_account";
import makeModifyAccount from "./modify_account";
import makeRemoveAccount from "./remove_account";

//import code dependencies
import Account from "../../entity/account";
import { bankDB } from "../../datastore/db/index";
import { generateId } from "../../tools/utils";

//dependency injection
const createAccount = makeCreateAccount({ bankDB, Account, generateId, moment });
const findAccount = makeFindAccount({ bankDB });
const modifyAccount = makeModifyAccount({ bankDB });
const removeAccount = makeRemoveAccount({ bankDB });

export default {
  createAccount,
  findAccount,
  modifyAccount,
  removeAccount,
};
