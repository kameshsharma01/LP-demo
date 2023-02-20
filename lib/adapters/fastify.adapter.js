// 3rd-party
const fastify = require('fastify');

// local
const env = require('../modules/env.module');
const loggerFactory = require('../modules/logger.module');
const monitorV1Service = require('../services/monitor-v1.service');
const rendererV1Service = require('../services/renderer-v1.service');
const validatorFactory = require('../modules/validator.module');

// init
const DEFAULT_PORT = 3000;
const DEFAULT_HOST = 'localhost';
const PORT = Number(env.get('PORT', DEFAULT_PORT));
const HOST = env.get('HOST', DEFAULT_HOST);
let server;

exports.init = function (config = {}) {
  const logger = config.logger || loggerFactory({ name: 'main' });
  const validator = config.validator || validatorFactory();

  server = fastify({ logger });
  server.setValidatorCompiler(({ schema }) => {
    return validator.compile(schema);
  });

  server.register(monitorV1Service, { prefix: '/v1/monitor' });
  server.register(rendererV1Service, { prefix: '/v1/renderer', validator });
};

exports.connect = function () {
  return server.listen(PORT, HOST);
};

exports.disconnect = async function () {
  await server.close();
  server.log.info('Fastify adapter disconnected');
};

exports.inject = function (request) {
  return server.inject(request);
};
