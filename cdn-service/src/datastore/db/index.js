import _ from "lodash";

import dbOps from "../../drivers/database/index";
import makeCdnDB from "./cdn_db";

const CONFIG = require("../../config/config.json");

export const cdnDB = makeCdnDB({ dbOps, CONFIG });


