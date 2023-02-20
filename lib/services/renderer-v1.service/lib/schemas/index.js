// stdlib
const fs = require('fs');

// init
let schemas = [];

fs.readdirSync(__dirname).forEach((filename) => {
  if (/\.schema/.test(filename)) {
    schemas = schemas.concat(require(`./${filename}`));
  }
});

module.exports = schemas;
