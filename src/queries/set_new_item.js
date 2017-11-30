const databaseConnection = require('../database/db_connection.js');

const setNewItem = (newItem, cb) => {
    databaseConnection.query(
        'INSERT INTO items (user_id, cost, category, date_purchased, status) VALUES ((SELECT id FROM users WHERE user_name = $1), $2, $3, $4, $5)', [newItem.userName, newItem.cost, newItem.category, newItem.datePurchased, false],
        (err, res) => {
            if (err) {
                return cb(err);
            } else {
                cb(null, res);
            }
        })
};

module.exports = setNewItem;