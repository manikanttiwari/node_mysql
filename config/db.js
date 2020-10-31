const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'manikant@@123',
    database: 'nodemysql'
});

db.connect((err) => {
    if (err) throw err;
    console.log('My sql connected...')
});


module.exports = db;
