import ffmpeg from "fluent-ffmpeg";


function encodeHls(prop) {
  console.log(prop)
  ffmpeg(prop.path, { timeout: 432000 })
    .addOptions([
      "-profile:v baseline", // baseline profile (level 3.0) for H264 video codec
      "-level 3.0",
      "-s 640x360", // 640px width, 360px height output video dimensions
      "-start_number 0", // start the first .ts segment at index 0
      "-hls_time 6", // 10 second segment duration
      "-hls_list_size 0", // Maxmimum number of playlist entries (0 means all entries/infinite)
      "-f hls", // HLS format
    ])
    .output(`./public/videos/${prop.id}.m3u8`)
    .on("end", notify)
    .run();
}

function notify() {
  //todo - notify encoding completed using web sockets
  console.log("upload done!");
}

const ffmpegWrapper = {
  name: "ffmpeg",
  encodeHls: encodeHls,
};

export default ffmpegWrapper;
