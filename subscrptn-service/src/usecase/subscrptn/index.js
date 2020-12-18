//import library dependencies
import moment from 'moment'

//import factory modules
import makeCreateSubscrptn from "./create_subscrptn";
import makeCheckSubscrptn from "./check_subscrptn";
import makeModifySubscrptn from "./modify_subscrptn";

//import code dependencies
import Subscrptn from "../../entity/subscrptn";
import { subDB } from "../../datastore/db/index";
import { generateId } from "../../tools/utils";

//dependency injection
const createSubscrptn = makeCreateSubscrptn({ subDB, Subscrptn, generateId, moment });
const checkSubscrptn = makeCheckSubscrptn({ subDB, moment });
const modifySubscrptn = makeModifySubscrptn({ subDB, moment });

export default {
  createSubscrptn,
  checkSubscrptn,
  modifySubscrptn
};
