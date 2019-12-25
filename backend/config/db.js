const mysql      = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'weather'
});

connection.connect();

module.exports = connection;