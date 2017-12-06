const databaseConnection = require('../database/db_connection.js');


const getPassword = (userData, cb) => {
  databaseConnection.query('SELECT users.password FROM users WHERE users.user_name = $1' , [userData.username],
    (err, res) => {
      if (err) {
        return cb(err);
      } else {
        cb(null, res);
      }
    }
  );
};


module.exports = getPassword;
