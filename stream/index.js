const HLSServer = require('./server/index');
const http = require('http')
const ffmpeg = require('fluent-ffmpeg')
const server = http.createServer();
const hls = new HLSServer(server, {
  path: '/streams',     // Base URI to output HLS streams
  dir: 'public/videos'  // Directory that input files are stored
})

server.listen(8000, (err, done) => {
    if(!err) console.log("running");
});
encodeV();

function encodeV()
{
    ffmpeg('input.mp4', { timeout: 432000 }).addOptions([
        '-profile:v baseline', // baseline profile (level 3.0) for H264 video codec
        '-level 3.0', 
        '-s 640x360',          // 640px width, 360px height output video dimensions
        '-start_number 0',     // start the first .ts segment at index 0
        '-hls_time 3',        // 10 second segment duration
        '-hls_list_size 0',    // Maxmimum number of playlist entries (0 means all entries/infinite)
        '-f hls'               // HLS format
      ]).output('public/videos/output.m3u8').on('end', 
      (err,done) => {
          if(err) throw err;
            console.log("DONE")
      }).run()
}
