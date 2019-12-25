const database = require('../config/db');

database.query("create table if not exists city (name varchar(255) not null primary key)");


exports.addCity = (name, callback) => {
    database.query("insert into city values(?)", name, (err, res) => {
        callback(err, res)
    })
};

exports.deleteCity = (name, callback) => {
    database.query("delete from city where name=?", name, (err, res) => {
        callback(err, res)
    })
};

exports.get = (callback) => {
    database.query("select * from city", null, (err, res) => {
        callback(err, res)
    })
};