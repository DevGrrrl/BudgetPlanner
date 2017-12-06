const validator = require('validator');
const bcrypt = require('bcryptjs');

const validateUser = userObj => {
    if (!validator.isAlphanumeric(userObj.username)) {
        return new Error('Username should only contain alphanumeric characters');
    } else if (!validator.matches(userObj.password, /[a-zA-Z0-9]{8,}/)) {
        return new Error('Password should only contain letters and numbers, and should be at least 8 characters long');
    } else {
        return true
    }
}

/* User object is updated with password hashed*/

const genHashedPassword = (userObj, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            callback(err)
        } else {
            bcrypt.hash(userObj.password, salt, (err, hash) => {
                if (err) {
                    callback(err)
                } else {
                    userObj.password = hash;
                    callback(null, userObj);
                }
            });
        }
    })
}

/* res = true if passwords match, else false*/

const comparePasswords = (userObj, databasePassword, callback) => {
    bcrypt.compare(userObj.password, databasePassword, (err, res) => {
        if (err) {
            callback(err)
        } else {
            callback(null, res)
        }
    });
}



module.exports = { validateUser, genHashedPassword, comparePasswords };