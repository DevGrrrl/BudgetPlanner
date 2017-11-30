const databaseConnection = require('../database/db_connection.js');


const unpaidItems = cb => {
  databaseConnection.query('SELECT users.user_name, items.cost, items.category, items.date_purchased FROM items INNER JOIN users ON users.id = items.user_id WHERE items.status = false',
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        console.log(res.rows);
        cb(null, res.rows);
      }
    });

};


module.exports = unpaidItems;
