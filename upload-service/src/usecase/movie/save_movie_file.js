export default function makeSaveMovieFile({ encoder }) {
  return async function saveMovieFile(path, mid) {
    let p = await encoder.encoderStart({name: 'ffmpeg'});
    p.encodeHls({ path: path, id: mid });
    return 1;
  };
}
