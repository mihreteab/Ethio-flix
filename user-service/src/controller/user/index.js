//import factory modules
import makePostUser from "./post_user";
import makeGetUser from "./get_user";
import makeGetAccess from "./get_access";
import makePatchUser from "./patch_user";
import makeDeleteUser from "./delete_user";

//import dependencies
import userLogic from "../../usecase/user/index";
import auth from '../../tools/auth'
//fix me!! this is just a stub assertion function
const assertType = (data, type) => {
  return true;
};

//dependency injection
const postUser = makePostUser({ userLogic, assertType, auth });
const getUser = makeGetUser({ userLogic, assertType });
const getAccess = makeGetAccess({ userLogic, assertType, auth });
const patchUser = makePatchUser({ userLogic, assertType });
const deleteUser = makeDeleteUser({ userLogic, assertType });

export default {
  postUser,
  getUser,
  getAccess,
  patchUser,
  deleteUser,
};
