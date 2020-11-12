//import {uri2capid} from '../platform/auth/logic/core/caps.js'

import fs from 'fs'
import NET from './net'

async function read_config(file)
{
  if(!fs.existsSync(file)){
    return 0;
  }

  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

async function write_config(file, conf, mode)
{
  /*FIXME: assertion of conf*/

  if(mode == 'a'){
    let c = JSON.parse(fs.readFileSync(file, 'utf8'));

    fs.writeFileSync(file, JSON.stringify({...c, ...conf}, 0, '  '), 'utf8');
  }
  else if(mode == 'w'){
    fs.writeFileSync(file, JSON.stringify(conf, 0, '  '), 'utf8');
  }
  else {
    return 0;
  }

  return 1;
}

async function create_service(arg)
{
  let r, data;

  data = {
    auth: {
      license: arg.license
    },
    param: {
      sii: arg.sii
    }
  }

  r = await NET.run(data, arg.conf.proxy.url, '/platform/auth/users/service/write');


  console.log(JSON.stringify(r, 0, '  '));

  if(r.status == "err"){
    return 0;
  }

  return r.result;
}

async function export_caps(arg, service_id, caps)
{
  let data = {
    auth: {
      license: arg.license
    },
    param: {
      service_id: service_id,
      caps: caps
    }
  }

  let r = await NET.run(data, arg.conf.proxy.url, '/platform/auth/caps/export');

  console.log(JSON.stringify(r, 0, '  '));

  if(r.status == "err"){
    return 0;
  }

  return 1;
}

async function allow_caps(arg, uid, caps)
{
  //console.log(":::"+JSON.stringify(caps, 0, '  '));

  /*let caps = [];

  for(let i = 0; i<caps_uri.length; i++){
    caps.push(await uri2capid(caps_uri[i]));
  }*/

  let data = {
    auth: {
      license: arg.license
    },
    param: {
      uid: uid,
      caps: caps
    }
  }

  let r = await NET.run(data, arg.conf.proxy.url, '/platform/auth/caps/allow');

  console.log(JSON.stringify(r, 0, '  '));

  if(r.status == "err"){
    return 0;
  }

  return 1;
}

const SETUP = {
  create_service:	create_service,
  export_caps:		export_caps,
  allow_caps:		allow_caps,
  write_config:		write_config,
  read_config:		read_config
};

export default SETUP

