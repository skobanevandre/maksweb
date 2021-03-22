const mysql = require('mysql2');

const connectionProperties = {
    connectionLimit: 5,
    host     : process.env.DBHOST,
    user     : process.env.DBUSER,
    password : process.env.DBPASSWORD,
    database : process.env.DB,
  };

exports.connect = function() { 
    return mysql.createConnection( connectionProperties ).promise();
};  
