const databaseConnection = require('../database/db_connection.js');

/*Once user has been created, add item*/

let newItem = {
    userName: 'Hannah',
    cost: 2.45,
    category: 'Groceries',
    datePurchased: new Date('2017-11-29'),
}

/*  */
const setNewItem = (newItem, cb) => {
    databaseConnection.query(
        'INSERT INTO items (user_id, cost, category, date_purchased) VALUES ((SELECT id FROM users WHERE user_name = $1), $2, $3, $4)'), [newItem.userName, newItem.cost, newItem.category]

    (err, res) => {
        if (err) {
            return cb(err);
        } else {
            cb(null, res);
        }
    }
);
};

module.exports = setNewItem;