// 3rd-party
const { String: SugarString } = require('sugar-string');

// init
require('sugar-inflections');

exports.camelize = function (string) {
  return SugarString.camelize(deDot(string), false);
};

exports.constantize = function (string) {
  return SugarString.underscore(deDot(string)).toUpperCase();
};

exports.capitalize = function (string, lower, all) {
  return SugarString.capitalize(string, lower, all);
};

exports.dasherize = function (string) {
  return SugarString.dasherize(deDot(string));
};

exports.pascalize = function (string) {
  return SugarString.camelize(deDot(string), true);
};

function deDot(string) {
  return string.replace(/\./g, '-');
}
