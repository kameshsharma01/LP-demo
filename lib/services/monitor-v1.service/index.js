// local
const routes = require('./lib/routes');

module.exports = function (fastify, options, next) {
  routes.forEach((route) => {
    fastify.route(route);
  });
  next();
};
