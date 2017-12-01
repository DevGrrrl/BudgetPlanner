const databaseConnection = require('../database/db_connection.js');

const getCostPerPerson = cb => {
    databaseConnection.query('SELECT users.user_name, SUM(items.cost) FROM users, items WHERE users.id = items.user_id AND items.status = false GROUP BY users.user_name', (err, res) => {
        if (err) {
            cb(err);
        } else {
            cb(null, res.rows);
        }
    });
};

module.exports = getCostPerPerson;
