const test = require('tape');
const { validateUser, genHashedPassword, comparePasswords } = require('../src/logic.js')


test('validate user object', (t) => {
    const userObjBadUsername = { username: '<html>', password: 'Passw0rd1' }
    const userObjBadPassword = { username: 'Hannah', password: '<html>' }
    t.equal(validateUser(userObjBadUsername).message, 'Username should only contain alphanumeric characters', 'Should return error message if username is bad');
    t.equal(validateUser(userObjBadPassword).message, 'Password should only contain letters and numbers, and should be at least 8 characters long', 'Should return error message if password is bad');
    t.end();
});


test('generate new hashed password', (t) => {
    const userObj = { username: 'Hannah', password: 'sdgsgdfg' }
    genHashedPassword(userObj, (err, res) => {
        if (err) console.log(err)
        else {
            t.equal(res.password.slice(0, 7), '$2a$10$', 'Should update user object to contained hashed password');
            t.end();
        }
    })
});

test('check compare password function', (t) => {
    const userObj = { username: 'Hannah', password: 'qwerty123' }
    const userObjCompareGood = { username: 'Hannah', password: 'qwerty123' }
    const userObjCompareBad = { username: 'Hannah', password: 'qwerty' }
    genHashedPassword(userObj, (err, res) => {
        if (err) console.log(err)
        comparePasswords(userObjCompareGood, res.password, (err, result) => {
            if (err) console.log(err)
            t.equal(result, true, 'Should respond true if passwords match');
        })
        comparePasswords(userObjCompareBad, res.password, (err, result) => {
            if (err) console.log(err)
            t.equal(result, false, 'Should respond false if passwords dont match');
            t.end();
        })
    })
});