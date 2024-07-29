const jwt = require('jsonwebtoken')
const connection = require('../controllers/mySQL')
const mysql = require('mysql2')


const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to database', err)
        }
    })


    // Is it valid?
    if (token) {
        jwt.verify(token, 'blue origin secret database', (err, decodedToken) => {
            if (err) {
                res.redirect('http://10.80.130.91:3000/auth')
                console.log(err.message)
            } else {
                // console.log(decodedToken);
                next()
            }
        })
    }
    else {
        res.redirect('http://10.80.130.91:3000/auth')
    }
} 

// check user

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'blue origin secret database', (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.user = null;
                next();
            } else {
                //console.log(decodedToken);
                let user = decodedToken.username;
                connection.connect((err) => {
                    if (err) {
                        console.error('Error connecting to database', err)
                    }
                    else {
                    connection.query('SELECT * FROM users', async (error, results, fields) => {
                        if (error) {
                            console.error('Error finding table', error);
                        } else {
                        const allUsers = results;
                        // console.log(allUsers)
                        const loc = allUsers.findIndex(item => item.email === user)
                        username = allUsers[loc].username;
                        // console.log(username)
                        res.locals.user = allUsers[loc];
                        // console.log(res.locals.user)
                        next();
                        }
                    })
                }
            })
        }
    })
} else {
        res.locals.user = null;
        next();
    }
}

// check mysql connection
const checkConnection = (req, res, next) => {
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to database', err)
            next()
        }
        // console.log('Connected to database');
        next()
    })
}


module.exports = { requireAuth, checkUser, checkConnection }