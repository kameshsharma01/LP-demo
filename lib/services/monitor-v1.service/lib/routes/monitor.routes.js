// local
const monitorHandler = require('../handlers/monitor.handler');

module.exports = [
  {
    method: 'GET',
    path: '/health',
    handler: monitorHandler.health
  }
];
