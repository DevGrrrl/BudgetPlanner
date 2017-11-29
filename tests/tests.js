const test = require('tape');
const shot = require('shot');
const router = require('./src/router');
const { homeHandler, staticFileHandler, resultsHandler } = require('./src/handler');


test('Tape is working', (t) => {
    let num = 1;
    t.equal(num, 1, 'One should equal one');
    t.end();
});