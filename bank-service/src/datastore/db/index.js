import _ from "lodash";

import dbOps from "../../drivers/database/index";
import makeBankDB from "./bank_db";

const CONFIG = require("../../config/config.json");

export const bankDB = makeBankDB({ dbOps, CONFIG });


