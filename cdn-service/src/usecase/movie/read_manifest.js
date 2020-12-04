export default function makeReadManifest({ fs }) {
  return async function readManifest(path, cb) {
    if(!fs.exists(path)){
      return 0;
    }
    fs.getManifestStream(path, cb);
    return 1;
  };
}
