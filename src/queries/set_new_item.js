const databaseConnection = require('../database/db_connection.js');

const setNewItem = (newItem, cb) => {
    databaseConnection.query(
        'INSERT INTO items (user_id, cost, category, date_purchased, status) VALUES ($1, $2, $3, $4, $5)', [newItem.userId, newItem.cost, newItem.category, newItem.date, false],
        (err, res) => {
            if (err) {
                return cb(err);
            } else {
                cb(null, res);
            }
        })
};

module.exports = setNewItem;
