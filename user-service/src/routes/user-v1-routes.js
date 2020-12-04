/**
 * @name user-v1-api
 * @description This module packages the Moviedb API.
 */
"use strict";

import userController from "../controller/user/index";

const hydraExpress = require("hydra-express");
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = require("fwsp-server-response");

let serverResponse = new ServerResponse();
serverResponse.enableCORS(true);

express.response.sendError = function (err) {
  serverResponse.sendServerError(this, { result: { error: err } });
};

express.response.sendInvalidRequest = function (err) {
  serverResponse.sendInvalidRequest(this, { result: { error: err } });
};

express.response.sendNotFound = function (err) {
  serverResponse.sendNotFound(this, { result: { error: err } });
};

express.response.sendInvalidUserCredentials = function (err) {
  serverResponse.sendInvalidUserCredentials(this, { result: { error: err } });
};

express.response.sendOk = function (result) {
  serverResponse.sendOk(this, { result });
};

let api = express.Router();

const sendResponse = ({ status, result }, res) => {
  switch (status) {
    case 200:
      res.sendOk(result);
      break;
    case 400:
      res.sendInvalidRequest(result);
      break;
    case 401:
      res.sendInvalidUserCredentials(result);
      break;
    case 404:
      res.sendNotFound(result);
      break;
    case 500:
      res.sendInvalidUserCredentials(result);
      break;
    default:
      break;
  }
};

api.get("/", (req, res) => {
  res.sendOk({ greeting: {
    service_name: "user-service",
    version: "v1.0"
  } });
});

api.post("/user/get", async (req, res) => {
  const r = await userController.getUser(req.body.param);
  sendResponse(r, res);
});

api.post("/user/signup", async (req, res) => {
  const r = await userController.postUser(req.body.param);
  sendResponse(r, res);
});

api.post("/user/signin", async (req, res) => {
  const r = await userController.getAccess(req.body.param);
  sendResponse(r, res);
});

module.exports = api;
