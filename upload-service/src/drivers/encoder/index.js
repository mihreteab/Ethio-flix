import ffmpegWrapper from "./ffmpeg/ffmpeg";

var encoderOps = [];

function getEncoderOps(encoderName) {
  for (let i = 0; i < encoderOps.length; i++) {
    if (encoderOps[i].name == encoderName) {
      return encoderOps[i];
    }
  }
  return null;
}

export async function encoderStart(encoderConf) {
  let encoder = getEncoderOps(encoderConf.name);
  if (!encoder) {
    return 0;
  }
  return encoder;
}

export async function encodeHls(encoder, prop) {
  if (!encoder) {
    return null;
  }
  encoder.encodeHls(prop);

  return 1;
}

export function encoderRegisterDriver(encoder) {
  for (let i = 0; i < encoderOps.length; i++) {
    if (encoderOps[i].name == encoder.name) {
      return 0;
    }
  }

  encoderOps.push(encoder);

  return 1;
}

export function encoderUnregisterDriver(encoder) {
  for (let i = 0; i < encoderOps.length; i++) {
    if (encoderOps[i].name == encoder.name) {
      encoderOps.splice(i, 1);
      return 1;
    }
  }
  return 0;
}

export async function encoderLoad() {
  encoderRegisterDriver(ffmpegWrapper);
}

/* unload encoding drivers */
export async function encoderUnload() {
  encoderUnregisterDriver(ffmpegWrapper);
}

export default {
  encoderStart,
  encodeHls,
};
