const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: //your database password,
    database: 'nodemysql'
});

db.connect((err) => {
    if (err) throw err;
    console.log('My sql connected...')
});


module.exports = db;
