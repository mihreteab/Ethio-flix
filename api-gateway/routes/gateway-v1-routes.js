/**
 * @name hello-v1-api
 * @description This module packages the Hello API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = require('fwsp-server-response');
const NET = require('../tools/net');

let serverResponse = new ServerResponse();
express.response.sendError = function (err) {
  serverResponse.sendServerError(this, { result: { error: err } });
};
express.response.sendOk = function (result) {
  serverResponse.sendOk(this, { result });
};

let api = express.Router();

const services = {
  moviedb: {
    url: "http://127.0.0.1:7500/v1/moviedb"
  },
  admin: {
    url: "http://127.0.0.1:7600/v1/admin"
  }
}
api.post('/',
  async (req, res) => {
    if (req.body.data) {
      let url = req.body.data.split('/');
      let service = url[1];
      let path = url[2]+"/"+url[3];
      let com_url = `${services[service].url}/${path}`;
      let result = await NET.run({}, com_url, '');
      console.log(com_url);
      res.json(result);
    }
    else{
      res.sendOk({greetings: "Welcome to Ethioflix api gateway"});
    }
  });



module.exports = api;
