/**
* @name Hello
* @summary Hello Hydra Express service entry point
* @description 
*/

const version = require('./package.json').version;
import hydraExpress from 'hydra-express';
import  { db_open } from './dbconnection';
let config = require('fwsp-config');

/**
* Load configuration file and initialize hydraExpress app
*/
db_open();
  config.init('./config/config.json')
    .then(() => {
      config.version = version;
      return hydraExpress.init(config.getObject(), version, () => {
        hydraExpress.registerRoutes({
          '/v1/gateway': require('./routes/gateway-v1-routes')
        });
      });
    })
    .then(serviceInfo => console.log('serviceInfo', serviceInfo))
    .catch(err => console.log('err', err));


