module.exports = HLSServer;

var http = require("http");
var url = require("url");
var path = require("path");
var zlib = require("zlib");
var httpAttach = require("http-attach");
var fsProvider = require("./fsProvider");
var debugPlayer = require("./debugPlayer");

var CONTENT_TYPE = {
  MANIFEST: "application/vnd.apple.mpegurl",
  SEGMENT: "video/MP2T",
  HTML: "text/html"
};

var config = {
  url: "/",
  dir: "",
  debugPlayer: true,
  provider: fsProvider
};

function HLSServer(server, params) {
  if (!(this instanceof HLSServer)) return HLSServer(server, params);

  if (server) bind_server(server, params);
}

function bind_server(server, params) {
  config = {
    ...config,
    url: params.path || config.url || "/",
    dir: params.dir || config.dir || "",
    debugPlayer: params.debugPlayer == null ? true : params.debugPlayer,
    provider: params.provider || fsProvider
  };

  if (isNaN(server)) {
    httpAttach(server, _middleware);
  } else {
    // Port numbers
    var port = server;
    server = http.createServer();
    httpAttach(server, _middleware);
    server.listen(port);
  }
}

function _middleware(req, res, next) {
  let uri = url.parse(req.url).pathname;
  let relativePath = path.relative(config.url, uri);
  let filePath = path.join(config.dir, relativePath);
  let extension = path.extname(filePath);

  req.filePath = filePath;

  // Gzip support
  let encode_sprt = req.headers["accept-encoding"] || "";
  req.acceptsCompression = encode_sprt.match(/\bgzip\b/);

  if (uri === "/player.html" && config.debugPlayer) {
    _writeDebugPlayer(res, next);
    return;
  }

  config.provider.exists(req, function(err, exists) {
    if (err) {
      res.statusCode = 500;
      res.end();
    } else if (!exists) {
      res.statusCode = 404;
      res.end();
    } else {
      switch (extension) {
        case ".m3u8":
          _writeManifest(req, res, next);
          break;
        case ".ts":
          _writeSegment(req, res, next);
          break;
        default:
          next();
          break;
      }
    }
  });
}

function _writeDebugPlayer(res, next) {
  res.setHeader("Content-Type", CONTENT_TYPE.HTML);
  res.statusCode = 200;
  // TODO: Use HLS.js
  res.write(debugPlayer.html);
  res.end();
  next();
}

function _writeManifest(req, res, next) {
  config.provider.getManifestStream(req, function(err, stream) {
    if (err) {
      res.statusCode = 500;
      res.end();
      return next();
    }

    res.setHeader("Content-Type", CONTENT_TYPE.MANIFEST);
    res.statusCode = 200;

    if (req.acceptsCompression) {
      res.setHeader("content-encoding", "gzip");
      res.statusCode = 200;
      const gzip = zlib.createGzip();
      stream.pipe(gzip).pipe(res);
    } else {
      stream.pipe(res, "utf-8");
    }
  });
}

function _writeSegment(req, res, next) {
  config.provider.getSegmentStream(req, function(err, stream) {
    if (err) {
      res.statusCode = 500;
      res.end();
      return;
    }
    res.setHeader("Content-Type", CONTENT_TYPE.SEGMENT);
    res.statusCode = 200;
    stream.pipe(res);
  });
}
