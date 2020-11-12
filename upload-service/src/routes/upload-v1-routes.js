/**
 * @name upload-v1-api
 * @description This module packages the Moviedb API.
 */
"use strict";

import uploadController from "../controller/index";

const multer = require("multer");
const path = require("path");
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

api.get("/", (req, res) => {
  res.sendOk({ greeting: {
    service_name: "upload",
    version: "v1.0"
  } });
});

api.post("/file/upload", upload.single('movie_file'), async (req, res) => {
  const param = {
    path: req.file.path,
    mid: req.body.mid,
  };
  const r = await uploadController.uploadMovie(param);
  sendResponse(r, res);
});

api.post("/file/get", async (req, res) => {
  const r = await uploadController.getFile(req.body.param);
  sendResponse(r, res);
});

api.post("/file/delete", async (req, res) => {
  const r = await uploadController.deleteFile(req.body.param);
  sendResponse(r, res);
});

api.post("/file/patch", async (req, res) => {
  const r = await uploadController.patchFile(req.body.param);
  sendResponse(r, res);
});

module.exports = api;
