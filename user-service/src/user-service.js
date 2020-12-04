/**
 * @name User
 * @summary User Hydra Express service entry point
 * @description store and manage user information on database
 */
"use strict";
import { userDB } from "./datastore/db/index";
import { dbLoad } from "./drivers/database/index";
import { createToken } from "./tools/auth";

const version = require("../package.json").version;
const hydraExpress = require("hydra-express");
const jwtAuth = require("fwsp-jwt-auth");

const HydraExpressLogger = require("fwsp-logger").HydraExpressLogger;
hydraExpress.use(new HydraExpressLogger());

let config = require("fwsp-config");

/**
 * Load configuration file and initialize  app
 */

async function startService() {
  await dbLoad();
  userDB.openUserDB().then(
    () => {
      config
        .init("./src/config/config.json")
        .then(() => {
          config.version = version;
          return jwtAuth.loadCerts(config.jwtPrivateCert, config.jwtPublicCert);
        })
        .then((status) => {
          return hydraExpress.init(config.getObject(), version, () => {
            hydraExpress.registerRoutes({
              "/user/v1": require("./routes/user-v1-routes"),
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
