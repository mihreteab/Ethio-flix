import _ from "lodash";

import dbOps from "../../drivers/database/index";
import makeUserDB from "./user_db";

const CONFIG = require("../../config/config.json");

export const userDB = makeUserDB({ dbOps, CONFIG });


