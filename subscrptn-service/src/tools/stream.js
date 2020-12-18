import io from 'socket.io-client';
import NET from './net';

var streams = {};

export async function stream_connect(st_conf, s_name)
{
  let prop = {
    transports: ['websocket'],
    //forceNew: true
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax : 5000,
    reconnectionAttempts: Infinity
  };

  streams[s_name] = io.connect(st_conf.url+s_name);
}

export async function stream_join(s_name, user)
{
  streams[s_name].emit('join', user);
}

export async function stream_exit(s_name, user)
{
  streams[s_name].emit('exit', user);
}

export function stream_send(s_name, data)
{
  if(streams[s_name] && streams[s_name]){
    streams[s_name].emit('send', data);
  }
}

export async function stream_listen(s_name, events)
{
  if(!streams[s_name])
    return;
    
  for(let i = 0; i < events.length; i++) {
    streams[s_name].on(events[i].e_name, (data) => {
      events[i].cb(data);
    });
  }
}

export async function stream_open(s_name, config)
{
  let r, data, stream;

  data = {
    auth: {
      license: config.auth.license,
    },
    param: {
      s_name: s_name
    }
  }

  //console.log('...........'+JSON.stringify(data, 0, '  '));

  r = await NET.run(data, config.proxy.url, '/platform/stream/open');

  //console.log(':::::::'+JSON.stringify(r, 0, '  '));

  if(r.status == "err") {
    return 0;
  }

  await stream_connect(config.stream, s_name);

  stream_join(s_name, {license: config.auth.license, id: config.auth.service_id});
  
  return 1;
}

const STREAM = {
  open: stream_open,
  connect: stream_connect,
  join: stream_join,
  exit: stream_exit,
  listen: stream_listen,
  send: stream_send
}

export default STREAM

