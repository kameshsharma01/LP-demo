#!/usr/bin/env node

// stdlib
const fs = require('fs');

// 3rd-party
const depcheck = require('depcheck/dist/cli');

// init
const csv = fs.readFileSync('.depcheckignore').toString().replace(/\n/g, ',');

depcheck([`--ignores=${csv}`], console.log, console.error, (code) => {
  process.exitCode = code;
});
