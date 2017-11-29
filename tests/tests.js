const test = require('tape');
const shot = require('shot');
// const router = require('./src/router');
// const { homeHandler, staticFileHandler, resultsHandler } = require('./src/handler');
const runDbBuild = require("../src/database/db_build");
const getCostPerPerson = require('../src/queries/get_data.js')


test('Tape is working', (t) => {
    let num = 1;
    t.equal(num, 1, 'One should equal one');
    t.end();
});

test('getCostPerPerson', (t) => {
    runDbBuild(function(err, res) {
        let expected = [{ user_name: 'James', sum: 8.26 }, { user_name: 'Alina', sum: 9.3 }];
        getCostPerPerson((err, res) => {
            if (err) console.log(err)
            t.deepEqual(expected, res, 'Should return summed cost per person')
            t.end();
        })
    })
});