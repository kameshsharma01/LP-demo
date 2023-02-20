// stdlib
const path = require('path');

// 3rd-party
const { Liquid } = require('liquidjs');

// init
const engine = new Liquid({
  root: path.resolve(__dirname, '../templates'),
  extname: '.liquid'
});

exports.renderTemplate = function (templateName, options) {
  return engine.renderFile(templateName, options);
};
