/**
 * @name hello-v1-api
 * @description This module packages the Hello API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = require('fwsp-server-response');

import routes from '../routes'

// let serverResponse = new ServerResponse();
// express.response.sendError = function (err) {
//   serverResponse.sendServerError(this, { result: { error: err } });
// };
// express.response.sendOk = function (result) {
//   serverResponse.sendOk(this, { result });
// };


let api;

export default async function export_route() {
  api = express.Router();

  for(let i=0; i < routes.length; i++){
    api.post(routes[i].url, async (req, res) => {
      let r = await routes[i].cb(req);
      res.json(r);
    })
  }

  return api;
};

