/**
 * @name Moviedb
 * @summary Moviedb Hydra Express service entry point
 * @description store and manage movie information on database
 */
"use strict";
import { movieDB } from "./datastore/db/index";
import { dbLoad } from "./drivers/database/index";

const version = require("../package.json").version;
const hydraExpress = require("hydra-express");

const jwtAuth = require("fwsp-jwt-auth");
const HydraExpressLogger = require("fwsp-logger").HydraExpressLogger;
hydraExpress.use(new HydraExpressLogger());

let config = require("fwsp-config");

/**
 * Load configuration file and initialize hydraExpress app
 */

async function startService() {
  await dbLoad();
  movieDB.openMovieDB().then(
    () => {
      config
        .init("./src/config/config.json")
        .then(() => {
          config.version = version;
          return jwtAuth.loadCerts(null, config.jwtPublicCert);
        })
        .then((status) => {
          return hydraExpress.init(config.getObject(), version, () => {
            hydraExpress.registerRoutes({
              "/moviedb/v1": require("./routes/moviedb-v1-routes"),
            });
          });
        })
        .then((serviceInfo) => console.log("serviceInfo", serviceInfo))
        .catch((err) => console.log("err", err));
    },
    (e) => {
      console.log(e);
      process.exit();
    }
  );
}

startService();

