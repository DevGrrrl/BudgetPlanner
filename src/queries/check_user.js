const databaseConnection = require('../database/db_connection.js');

const checkUser = (userData, cb) => {
    databaseConnection.query('SELECT CASE WHEN EXISTS (SELECT * FROM users WHERE user_name = $1) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END', [userData.username],
        (err, res) => {
            if (err) {
                return cb(err);
            } else {
                cb(null, parseInt(res.rows[0].case));
            }
        }
    );
};

module.exports = checkUser;
