const databaseConnection = require('../database/db_connection.js');

const createUser = (newItem, cb) => {
    databaseConnection.query('INSERT INTO users (user_name) VALUES ($1)', [newItem.username],
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