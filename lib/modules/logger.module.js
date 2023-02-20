// stdlib
const os = require('os');

// 3rd-party
const { mergeDeepRight } = require('ramda');
const pino = require('pino');

// local
const env = require('./env.module');

module.exports = function (options = {}, destination) {
  const defaults = {
    base: { pid: process.pid, host: os.hostname().toLowerCase() },
    level: env.get('LOG_LEVEL', 'error'),
    name: 'main',
    prettyPrint: false,
    redact: []
  };
  if (!env.isProduction()) {
    defaults.prettyPrint = {
      colorize: true,
      crlf: false,
      errorLikeObjectKeys: ['err', 'error'],
      errorProps: '',
      levelFirst: true,
      messageKey: 'msg',
      timestampKey: 'time',
      translateTime: "yyyy-mm-dd'T'HH:MM:ss.l'Z'",
      ignore: 'pid,host'
    };
  }
  return pino(mergeDeepRight(defaults, options), destination);
};
