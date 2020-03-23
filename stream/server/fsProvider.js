const fs = require('fs')


function exists(req, cb) {
  fs.exists(req.filePath, function (exists) {
    cb(null, exists)
  })
}

function getSegmentStream(req, cb) {
  cb(null, fs.createReadStream(req.filePath))
}

function getStream(req, cb) {
  cb(null, fs.readFileSync(req.filePath));
  
}

function getManifestStream (req, cb) {
  cb(null, fs.createReadStream(req.filePath, { bufferSize: 64 * 1024 }))
}

module.exports = {
  exists,
  getManifestStream,
  getSegmentStream,
  getStream
}
