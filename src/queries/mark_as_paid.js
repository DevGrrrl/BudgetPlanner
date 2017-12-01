const databaseConnection = require('../database/db_connection.js');

const markAsPaid = (cb) => {
  databaseConnection.query(
    'UPDATE items SET status = true',
    (err, res) => {
      if(err) {
        return cb(err);
      } else {
        cb(null, res);
      }
    })
};


 module.exports = markAsPaid;
