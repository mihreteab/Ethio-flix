export default function makeReadSegment({ fs }) {
  return async function readSegment(path, cb) {
    if (!fs.exists(path)) {
      return 0;
    }
    fs.getSegmentStream(path, cb);
    return 1;
  };
}
