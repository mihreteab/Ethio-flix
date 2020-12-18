/**
 * @name moviedb-v1-api
 * @description This module packages the Moviedb API.
 */
"use strict";

import accountController from "../controller/account/index";
import txnController from "../controller/transaction/index";
import allowAccess from "../tools/access_ctrl/access_ctrl";

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
    service_name: "bank-service",
    version: "v1.0"
  } });
});

api.post("/account/post", allowAccess, async (req, res) => {
  const r = await accountController.postAccount(req.body.param);
  sendResponse(r, res);
});

api.post("/account/get", allowAccess, async (req, res) => {
  const r = await accountController.getAccount(req.body.param);
  sendResponse(r, res);
});

api.post("/txn/deposite", allowAccess, async (req, res) => {
  const r = await txnController.postDeposite(req.body.param);
  sendResponse(r, res);
});

api.post("/txn/transfer", allowAccess, async (req, res) => {
  const r = await txnController.postWithdrawal(req.body.param);
  sendResponse(r, res);
});

api.post("/txn/balance/get", allowAccess, async (req, res) => {
  const r = await txnController.getBalance(req.body.param);
  sendResponse(r, res);
});

module.exports = api;
