module.exports = function nodeEnv(env) {
  const { NODE_ENV } = process.env;
  process.env.NODE_ENV = env;
  return function restoreNodeEnv() {
    process.env.NODE_ENV = NODE_ENV;
  };
};
