// local
const rendererHandler = require('../handlers/renderer.handler');

module.exports = [
  {
    method: 'POST',
    path: '/',
    handler: rendererHandler.post,
    schema: {
      body: {
        $ref: 'http://liquid-proxy/schemas/v1/renderer.json#'
      }
    }
  }
];
