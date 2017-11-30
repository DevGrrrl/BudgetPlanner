const test = require('tape');
const shot = require('shot');
// const router = require('./src/router');
// const { homeHandler, staticFileHandler, resultsHandler } = require('./src/handler');
const runDbBuild = require("../src/database/db_build");
const getCostPerPerson = require('../src/queries/get_data.js')
const testCheckUser = require('../src/queries/check_user.js')


test('Tape is working', (t) => {
    let num = 1;
    t.equal(num, 1, 'One should equal one');
    t.end();
});

test('getCostPerPerson', (t) => {
    runDbBuild(function(err, res) {
        let expected = [{ user_name: 'Alina', sum: 9.3 }, { user_name: 'James', sum: 8.26 } ];
        getCostPerPerson((err, res) => {
            if (err) console.log(err)
            t.deepEqual(expected, res, 'Should return summed cost per person')
            t.end();
        })
    })
});

test('test check_user', (t) => {
    runDbBuild(function(err, res) {
        let newItem = {userName:'Alina'}
        testCheckUser(newItem,(err, res) => {
            if (err) console.log(err)
          t.equal(1, res, 'Should return 1 if name is present in db');
        })
    })
    runDbBuild(function(err, res) {
        let newItem = {userName:'Hannah'}
        testCheckUser(newItem,(err, res) => {
            if (err) console.log(err)
          t.equal(0, res, 'Should return 0 if name is not present in db')
            t.end();
        })
    })
});
