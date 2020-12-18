export default function makeReadThumb({ fs }) {
  return async function readThumb(path, cb) {
    if(!fs.exists(path)){
      return 0;
    }
    fs.getBannerStream(path, cb);
    return 1;
  };
}
