import LOG from './log';

function err(msg, func, config)
{
  let r, info;

  info =  {
    msg: msg,
    srv: `://${config.api.host}/${config.api.port}/${config.name}`,
    func: func
  }

 // LOG.error({uservice: config.name, status: "err", info: msg, func: func});

  if(msg){
    r =  {
      status: "err",
      result: {
        info: info
      }
    }
  }
  else {
    r = {
      status: "err"
    }
  }

  return r;
}

function ok(msg, func, config)
{
  let r, info;

  //info = {
  //  msg: msg,
  //  srv: `://${config.api.host}/${config.api.port}/${config.name}`,
  //  func: func
  //}

 // LOG.info({uservice: config.name, status: "ok", info: msg, func: func});

  if(msg){
    r = {
      status: "ok",
      result: msg
    }
  }
  else {
    r = {
      status: "ok"
    }
  }

  return r;
}

const res = {
  err: err,
  ok: ok 
};

export default res
