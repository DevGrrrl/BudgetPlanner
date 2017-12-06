const test = require('tape');
const { validateUser } = require('../src/logic.js')


test('validate user object', (t) => {
    const userObjBadUsername = { username: '<html>', password: 'Passw0rd1' }
    const userObjBadPassword = { username: 'Hannah', password: '<html>' }
    t.equal(validateUser(userObjBadUsername).message, 'Username should only contain alphanumeric characters', 'Should return error message if username is bad');
    t.equal(validateUser(userObjBadPassword).message, 'Password should only contain letters and numbers, and should be at least 8 characters long', 'Should return error message if password is bad');
    t.end();
});