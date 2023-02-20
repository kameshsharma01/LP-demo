'use strict';

module.exports = {
  $id: 'http://liquid-proxy/schemas/v1/renderer.json#',
  type: 'object',
  additionalProperties: true,
  required: ['whitelist'],
  properties: {
    whitelist: {
      type: 'array',
      items: {
        type: 'string'
      },
      anyOf: [
        {
          contains: {
            const: 'cells'
          }
        },
        {
          contains: {
            const: 'cell-status'
          }
        }
      ]
    }
  }
};
