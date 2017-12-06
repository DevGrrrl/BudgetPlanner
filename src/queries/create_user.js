const databaseConnection = require('../database/db_connection.js');

const createUser = (userData, cb) => {
    databaseConnection.query('INSERT INTO users (user_name, password) VALUES ($1 , $2) RETURNING id, user_name', [userData.username, userData.password],
        (err, res) => {
            if (err) {
                return cb(err);
            } else {
                cb(null, res.rows);
            }
        }
    );
};

module.exports = createUser;
