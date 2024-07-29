const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '*star48cerea1',
    database: 'veex'
})
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database', err)
        return
    }
    console.log('Connected to database');
})

module.exports = connection;