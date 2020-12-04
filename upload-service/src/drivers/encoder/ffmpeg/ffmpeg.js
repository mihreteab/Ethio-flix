import ffmpeg from "fluent-ffmpeg";

function encodeHls(prop) {
  ffmpeg(prop.path, { timeout: 432000 })
    .addOptions([
      "-profile:v baseline", // baseline profile (level 3.0) for H264 video codec
      "-level 3.0",
      "-s 640x360", // 640px width, 360px height output video dimensions
      "-start_number 0", // start the first .ts segment at index 0
      "-hls_base_url http://127.0.0.1:5003/cdn/v1/file/segment/get/",
      "-hls_time 6", // 6 second segment duration
      "-hls_list_size 0", // Maxmimum number of playlist entries (0 means all entries/infinite)
      "-f hls", // HLS format
    ])
    .output(`/home/developer/videos/${prop.id}.m3u8`)
    .on("end", notify)
    .run();
}

function getDuration(prop, cb) {
  ffmpeg.ffprobe(prop.path, (err, metadata) => {
    if (err) {
      console.log(err);
    }
    console.log(metadata);
    cb(null, metadata);
  });
}

function createThumbnail(prop) {
  const DESTINATION = "/home/developer/videos";
  ffmpeg(prop.path).screenshots({
    timestamps: [30],
    filename: `${prop.id}.png`,
    folder: DESTINATION,
    size: "320x240",
  });
}

function notify() {
  //todo - notify encoding completed using web sockets
  console.log("upload done!");
}

const ffmpegWrapper = {
  name: "ffmpeg",
  encodeHls: encodeHls,
  getDuration: getDuration,
  createThumbnail: createThumbnail,
};

export default ffmpegWrapper;
