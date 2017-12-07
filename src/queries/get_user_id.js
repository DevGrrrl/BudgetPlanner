const databaseConnection = require('../database/db_connection.js');


const getUserId = (userData, cb) => {
    databaseConnection.query('SELECT user_name, id FROM users WHERE user_name = $1', [userData.username],
        (err, res) => {
            if (err) {
                return cb(err);
            } else {
                cb(null, JSON.stringify(res.rows[0]));
            }
        }
    );
};


module.exports = getUserId;