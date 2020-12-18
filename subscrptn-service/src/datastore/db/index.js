import _ from "lodash";

import dbOps from "../../drivers/database/index";
import makeSubDB from "./sub_db";


const CONFIG = require("../../config/config.json");

export const subDB = makeSubDB({ dbOps, CONFIG });
