/**
 * @name cdn-v1-api
 * @description This module packages the cdn API.
 */
"use strict";

import cdnController from "../controller/index";

const hydraExpress = require("hydra-express");
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

const CONTENT_TYPE = {
  MANIFEST: "application/vnd.apple.mpegurl",
  SEGMENT: "video/MP2T",
  THUMB: "image/png",
};

const pipeStream = (req, res, type) => {
  return function (err, stream) {
    switch (type) {
      case "manifest":
        res.setHeader("Content-Type", CONTENT_TYPE.MANIFEST);
        break;
      case "segment":
        res.setHeader("Content-Type", CONTENT_TYPE.SEGMENT);
        break;
      case "thumbnail":
        res.setHeader("Content-Type", CONTENT_TYPE.THUMB);
        break;
      default:
        break;
    }

    res.statusCode = 200;

    if (req.acceptsCompression) {
      res.setHeader("content-encoding", "gzip");
      res.statusCode = 200;
      const gzip = zlib.createGzip();
      stream.pipe(gzip).pipe(res);
    } else {
      stream.pipe(res, "utf-8");
    }
  };
};

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
  res.sendOk({
    greeting: {
      service_name: "cdn-service",
      version: "v1.0",
    },
  });
});


api.get("/file/manifest/get/:id", async (req, res) => {
  const r = await cdnController.getManifest(
    req.params,
    pipeStream(req, res, "manifest")
  );
});

api.get("/file/segment/get/:path", async (req, res) => {
  const r = await cdnController.getSegment(
    req.params,
    pipeStream(req, res, "segment")
  );
});

api.get("/file/thumbnail/get/:path", async (req, res) => {
  const r = await cdnController.getThumb(
    req.params,
    pipeStream(req, res, "thumbnail")
  );
});

module.exports = api;
