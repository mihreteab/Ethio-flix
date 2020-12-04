const fs = require("fs");
const util = require("util");

const fsExists = util.promisify(fs.existsSync);
const fsCreateReadStream = util.promisify(fs.createReadStream);
const fsReadFileSync = util.promisify(fs.readFileSync);


async function exists(path) {
  const exist = fs.existsSync(path);
  return exist;
}

function getSegmentStream(path, cb) {
  cb(null, fs.createReadStream(path));
}

function getStream(path, cb) {
  cb(null, fs.readFileSync(path));
}

function getManifestStream(path, cb) {
  cb(null, fs.createReadStream(path, { bufferSize: 64 * 1024 }));
}

export default {
  exists,
  getManifestStream,
  getSegmentStream,
  getStream,
};
