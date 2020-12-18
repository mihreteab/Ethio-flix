//import library dependencies
import moment from 'moment'

//import factory modules
import makeCreateUser from "./create_user";
import makeFindUser from "./find_user";
import makeCheckCred from "./check_cred";
import makeModifyUser from "./modify_user";
import makeModifyPassword from "./modify_password";
import makeRemoveUser from "./remove_user";

//import code dependencies
import User from "../../entity/user";
import { userDB } from "../../datastore/db/index";
import { generateId } from "../../tools/utils";
import auth from '../../tools/auth';

//dependency injection
const createUser = makeCreateUser({ userDB, User, generateId, moment, auth });
const findUser = makeFindUser({ userDB });
const checkCred = makeCheckCred({ userDB, auth });
const modifyUser = makeModifyUser({ userDB });
const modifyPassword = makeModifyPassword({ userDB, auth });
const removeUser = makeRemoveUser({ userDB });

export default {
  createUser,
  findUser,
  checkCred,
  modifyUser,
  modifyPassword,
  removeUser,
};
