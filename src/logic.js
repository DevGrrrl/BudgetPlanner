var validator = require('validator');

const validateUser = userObj => {
    if (!validator.isAlphanumeric(userObj.username)) {
        return new Error('Username should only contain alphanumeric characters');
    } else if (!validator.matches(userObj.password, /[a-zA-Z0-9]{8,}/)) {
        return new Error('Password should only contain letters and numbers, and should be at least 8 characters long');
    } else {
        return true
    }
}

/* Hash function takes object, returns object but with password hashed*/





module.exports = { validateUser };