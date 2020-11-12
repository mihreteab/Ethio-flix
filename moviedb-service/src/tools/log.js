const os = require('os');
const { createLogger, format, transports,addColors} = require('winston');
const { combine, timestamp, json, prettyPrint, errors,metadata } = format;

require('winston-daily-rotate-file');
const Graylog2 = require('winston-graylog2');

const logLevels = {
  levels: {
    error: 0, 
    warn: 1, 
    info: 2, 
    http: 3,
    verbose: 4, 
    debug: 5, 
    trace: 6,
  },
  colors: {
    info: 'green',
    debug: 'yellow',
    error: 'red',
    trace: 'grey'
  }
};

const _log = createLogger({
  levels: logLevels.levels,
  exitOnError: false,
  format: combine(
    //json(),
    timestamp(),
    metadata(),  //FIXME: this wrappes corner log attributes within metadata: {..}. Required by graylog transport
    format.printf(info =>`${JSON.stringify(info)}`+(info.splat!==undefined?`${info.splat}`:" ")),
    errors({slack: true}),
    //prettyPrint()
  ),
  defaultMeta: { hostname: os.hostname() },
  transports: [
    //new transports.File({filename: '/var/log/corner.error.log', level: 'error'}),
    new (transports.DailyRotateFile)({filename: '/var/log/corner.error.log', level: 'error', zippedArchive: true, maxSize: '10m', maxFiles: '90d'}),

    //new transports.File({filename: '/var/log/corner.trace.log', level: 'trace'}),
    new (transports.DailyRotateFile)({filename: '/var/log/corner.trace.log', level: 'trace', maxSize: '1m', maxFiles: '1'}),

    //new transports.File({filename: '/var/log/corner.log', level: 'info'})
    new (transports.DailyRotateFile)({filename: '/var/log/corner.info.log', level: 'info', zippedArchive: true, maxSize: '10m', maxFiles: '10d'})
  ]
});

addColors(logLevels.colors);

_log.add(new Graylog2([
  {
    name: 'Graylog',
    level: 'trace',
    graylog: {
      servers: [{host: 'localhost', port: 12201}],
      prelog: JSON.stringify
    },
  }
]));

const info = (msg) => {
  //FIXME: validate msg
  var message = msg.info

  _log.info({message, ...msg});
}

const debug = (msg) => {
  //FIXME: validate msg
  var message = msg.info

  _log.debug({message, ...msg});}

function error(msg){
  //FIXME: validate msg
  var message = msg.info

  _log.error({message, ...msg});
}

const trace = (msg) => {
  //FIXME: validate msg
  _log.trace(msg);
}

const fatal = (msg) => {
  //FIXME: validate msg
  _log.fatal(msg);
}

const query = (options) => {
    let results = [];
    
    _log.query({}, function (err, r) {
        if (err) {
          throw err;
        }
        console.log(r);
        //TO DO
    });

    return results;
}

//const warn = (msg) => {
//  //FIXME: validate msg
//  _log.warn(msg);
//}

const log = {
  info: info,
  debug: debug,
  error: error,
  fatal: fatal,
  trace: trace,
  query: query
};

export default log
