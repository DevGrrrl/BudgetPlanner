const databaseConnection = require('../../database/db_connection.js');

const getItem = cb => {
    databaseConnection.query('SELECT * FROM items', (err, res) => {
        if (err) {
            cb(err);
        } else {
            cb(null, res.rows);
        }
    });
};

module.exports = getItem;