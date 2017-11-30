const databaseConnection = require('../database/db_connection.js');

/* This will always be called first, on item entry*/
/* Function should check if user already exists based on user_name*/
/*return boolean*/

const checkUser = (newItem, cb) => {
    databaseConnection.query('SELECT user_name FROM users WHERE user_name = $1', [newItem.userName],
        (err, res) => {
            if (err) {
                return cb(err);
            } else {
                cb(null, res);
            }
        }
    );
};

module.exports = checkUser;
