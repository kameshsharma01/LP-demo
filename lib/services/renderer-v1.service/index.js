// local
const routes = require('./lib/routes');
const schemas = require('./lib/schemas');

module.exports = function (fastify, options, next) {
  console.log(2);
  schemas.forEach((schema) => {
    options.validator.addSchema(schema);
  });
  routes.forEach((route) => {
    fastify.route(route);
  });

  next();
};
