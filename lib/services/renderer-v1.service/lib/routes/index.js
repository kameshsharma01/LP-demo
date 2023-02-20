// stdlib
const fs = require('fs');

// init
let routes = [];

fs.readdirSync(__dirname).forEach((filename) => {
  if (/\.routes/.test(filename)) {
    routes = routes.concat(require(`./${filename}`));
  }
});

module.exports = routes;
