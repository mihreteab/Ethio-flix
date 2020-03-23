/**
* @name Hello
* @summary Hello Hydra Express service entry point
* @description 
*/

const version = require('./package.json').version;
let config = require('fwsp-config');

import hydraExpress from 'hydra-express';
import { db_open } from './dbconnection';
import export_route from './routes/admin-v1-routes'

/**
* Load configuration file and initialize hydraExpress app
*/

async function start_server(params) {
  const routes = await export_route();
  config.init('./config/config.json')
    .then(() => {
      config.version = version;
      return hydraExpress.init(config.getObject(), version, () => {
        hydraExpress.registerRoutes({
          '/v1/admin': routes
        });
      });
    })
    .then(serviceInfo => console.log('serviceInfo', serviceInfo))
    .catch(err => console.log('err', err));
}

db_open();
start_server();




