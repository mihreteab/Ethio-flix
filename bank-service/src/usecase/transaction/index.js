//import library dependencies
import moment from 'moment'

//import factory modules
import makeCreateTransaction from "./create_transaction";
import makeCalBalance from "./cal_balance";

//import code dependencies
import Transaction from "../../entity/transaction";
import { bankDB } from "../../datastore/db/index";
import { generateId } from "../../tools/utils";

//dependency injection
const createTransaction = makeCreateTransaction({ bankDB, Transaction, generateId, moment });
const findTransaction = makeCalBalance({ bankDB });
const calBalance = makeCalBalance({ bankDB });

export default {
  createTransaction,
  findTransaction,
  calBalance
};
