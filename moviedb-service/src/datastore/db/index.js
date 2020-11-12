import _ from "lodash";

import dbOps from "../../drivers/database/index";
import makeMovieDB from "./movie_db";

const CONFIG = require("../../config/config.json");

export const movieDB = makeMovieDB({ dbOps, CONFIG });


