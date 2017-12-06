const test = require('tape');
const shot = require('shot');
// const router = require('./src/router');
// const { homeHandler, staticFileHandler, resultsHandler } = require('./src/handler');
const runDbBuild = require("../src/database/db_build");
const getCostPerPerson = require('../src/queries/get_costs_per_person.js');
const checkUser = require('../src/queries/check_user.js');
const createUser = require('../src/queries/create_user.js');
const setNewItem = require('../src/queries/set_new_item.js');
const getUser = require('../src/queries/test_queries/test_get_user.js');
const getItem = require('../src/queries/test_queries/test_get_item.js');
const unpaidItems = require('../src/queries/unpaid_items');
const markAsPaid = require('../src/queries/mark_as_paid');


test('Tape is working', (t) => {
    let num = 1;
    t.equal(num, 1, 'One should equal one');
    t.end();
});

test('getCostPerPerson', (t) => {
    runDbBuild(function(err, res) {
        let expected = [{ user_name: 'Alina', sum: 9.3 }, { user_name: 'James', sum: 8.26 }];
        getCostPerPerson((err, res) => {
            if (err) console.log(err)
            console.log(res)
            t.deepEqual(expected, res, 'Should return summed cost per person')
            t.end();
        })
    })
});

test('test checkUser', (t) => {
    runDbBuild(function(err, res) {
        let newItem = { username: 'Alina' }
        checkUser(newItem, (err, res) => {
            if (err) console.log(err)
            t.equal(1, res, 'Should return 1 if name is present in db');
        })
    })
    runDbBuild(function(err, res) {
        let newItem = { username: 'Hannah' }
        checkUser(newItem, (err, res) => {
            if (err) console.log(err)
            t.equal(0, res, 'Should return 0 if name is not present in db')
            t.end();
        })
    })
});

test('test createUser', (t) => {
    runDbBuild(function(err, res) {
        let userData = { username: 'Hannah', password: '123456' }
        createUser(userData, (err, res) => {
            if (err) console.log(err)
            getUser((err, res) => {
                t.equal(3, res.length, "Should be new row in users table (total 3)")
                t.end();
            })
        })
    })
});

test('test setNewItem', (t) => {
    runDbBuild(function(err, res) {
        let newItem = {
            username: 'Alina',
            cost: 2.45,
            category: 'Groceries',
            date: new Date('2017-11-29'),
        }
        setNewItem(newItem, (err, res) => {
            if (err) console.log(err)
            getItem((err, res) => {
                t.equal(4, res.length, "Should be new row in items table (total 4)")
                t.end();
            })
        })
    })
});



test('unpaidItems', (t) => {
    runDbBuild(function(err, res) {
        let expected = { user_name: 'Alina', cost: 9.30, category: 'Groceries', date_purchased: '2017-11-29' };
        unpaidItems((err, res) => {
            if (err) console.log(err)
            t.equal(expected, res, 'Should return all items with a status of false');
            t.end();
        })
    })
});

test('markAsPaid', (t) => {
    runDbBuild(function(err, res) {
      markAsPaid((err, res) => {
          if (err) console.log(err)
          getItem((err, res)=> {
            if(err) console.log(err);
            console.log(res);
            t.end();
          })

    })
  })
});
