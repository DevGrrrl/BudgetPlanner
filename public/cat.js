#!/usr/bin/env node
const fs = require('fs');


fs.readFile(process.argv[2], 'utf8', (err,data) =>{
  if (err) process.stdout.write(err);
  process.stdout.write(data);
});
