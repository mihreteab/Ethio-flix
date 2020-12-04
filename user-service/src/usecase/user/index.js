//import library dependencies
import moment from 'moment'

//import factory modules
import makeCreateUser from "./create_user";
import makeFindUser from "./find_user";
import makeCheckCred from "./check_cred";
import makeModifyUser from "./modify_user";
import makeRemoveUser from "./remove_user";

//import code dependencies
import User from "../../entity/user";
import { movieDB } from "../../datastore/db/index";
import { generateId } from "../../tools/utils";
import auth from '../../tools/auth';

//dependency injection
const createUser = makeCreateUser({ movieDB, User, generateId, moment, auth });
const findUser = makeFindUser({ movieDB });
const checkCred = makeCheckCred({ movieDB, auth });
const modifyUser = makeModifyUser({ movieDB });
const removeUser = makeRemoveUser({ movieDB });

export default {
  createUser,
  findUser,
  checkCred,
  modifyUser,
  removeUser,
};
