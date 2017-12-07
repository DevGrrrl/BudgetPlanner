const databaseConnection = require('../database/db_connection.js');


const getPassword = (userData, cb) => {
    databaseConnection.query('SELECT password FROM users WHERE user_name = $1', [userData.username],
        (err, res) => {
            if (err) {
                return cb(err);
            } else {
                cb(null, res.rows[0].password);
            }
        }
    );
};


module.exports = getPassword;