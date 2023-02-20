exports.get = function get(key, fallback) {
  return process.env[key] || fallback;
};

exports.need = function need(key) {
  if (!process.env[key]) {
    throw new Error(`${key} not defined`);
  }
  return process.env[key];
};

exports.isProduction = function isProduction() {
  return isEnv('production');
};

exports.isTest = function isTest() {
  return isEnv('test');
};

function isEnv(env) {
  return process.env.NODE_ENV === env;
}
