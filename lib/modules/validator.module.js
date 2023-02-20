'use strict';

// 3rd-party
const { mergeDeepRight: merge } = require('ramda');
const Ajv = require('ajv');
const jsonSchemaSecure = require('ajv/lib/refs/json-schema-secure.json');

module.exports = function (config = {}) {
  const defaults = {
    $data: true,
    allErrors: true,
    coerceTypes: true,
    messages: true,
    nullable: true,
    removeAdditional: true,
    useDefaults: true,
    v6: true
  };
  const ajv = new Ajv(merge(defaults, config));
  ajv.isSchemaSecure = ajv.compile(jsonSchemaSecure);
  return ajv;
};
