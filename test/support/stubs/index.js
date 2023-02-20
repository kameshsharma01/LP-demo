// 3rd-party
const requireDir = require('require-directory');

// local
const string = require('../../../lib/modules/string.module');

module.exports = requireDir(module, {
  rename(key) {
    return string.camelize(key);
  }
});
