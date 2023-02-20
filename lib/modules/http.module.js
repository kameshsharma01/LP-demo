// 3rd-party
const got = require('got');

// init
const DEFAULTS = { responseType: 'json' };

exports.get = function (url, options = {}) {
  return got.get(url, Object.assign({}, DEFAULTS, options));
};

exports.post = function (url, body, options = {}) {
  return got.post(url, Object.assign({ json: body }, DEFAULTS, options));
};

exports.put = function (url, body, options = {}) {
  return got.put(url, Object.assign({ json: body }, DEFAULTS, options));
};
