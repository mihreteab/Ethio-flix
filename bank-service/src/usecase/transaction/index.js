//import library dependencies
import moment from 'moment'

//import factory modules
import makeCreateTransaction from "./create_transaction";
import makeCalBalance from "./cal_balance";

//import code dependencies
import Account from "../../entity/account";
import { bankDB } from "../../datastore/db/index";
import { generateId } from "../../tools/utils";

//dependency injection
const createTransaction = makeCreateTransaction({ bankDB, Transaction, generateId, moment });
const findTransaction = makeCalBalance({ bankDB });

export default {
  createTransaction,
  findTransaction,
};
