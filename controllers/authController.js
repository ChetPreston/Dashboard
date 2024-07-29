const Joi = require('joi')
const User = require('../models/users')
const bcrypt = require("bcryptjs")
const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const connection = require('./mySQL')
const cookieParser = require('cookie-parser')


// functions 
const maxAgeS = 7 * 24 * 60 * 60
const createToken = (username) => {
    return jwt.sign({ username }, 'blue origin secret database', {
        expiresIn: maxAgeS
    })
}

module.exports.signup_get = (req, res) => {
    res.render('auth')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.signup_post = async (req, res) => {
    const { username, email, pw } = req.body;
    const role = 'user';
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(pw, salt)
    // console.log(password)
    const user = await User.validate({ username, email, password, role})
    if (user.error) {
        msg = []
         for (let i = 0; i < user.error.details.length; i++) {
            console.log(user.error.details[i].message)
            msg.push(user.error.details[i].message)
        }
        output = { msg:msg }
        res.send(output)
    }
    else {  
        connection.connect()
        connection.query('INSERT INTO users SET ?', user.value, (error, results, fields) => {
            if (error) {
                console.error('Error creating character:', error);
                // console.log(error.errno)
                if (error.errno === 1062) output = {msg:'Email address already registered'} 
                else output = error
            } else {
                console.log('New user created successfully.', results.insertId);
                const output = {
                    msg: `Created user ${username} succesfully`,
                    success: true
                }
                // login
                const token = createToken(user.value.email)
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAgeS * 1000 })
                res.cookie('user', username, { maxAge: maxAgeS * 1000 })
                res.cookie('role', role, { maxAge: maxAgeS * 1000 })
                res.send(output)
            }  
        })
        connection.end
    }
        // res.status(201).json(user)
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body
    console.log(email)
    // console.log(password)
    if (!email || !password) {
        console.log('No username or password')
        return res.status(400).json({
            msg: "Username or Password not provided",
        })
    }
     // Retrieve users database
    connection.connect()
    connection.query('SELECT * FROM users', async (error, results, fields) => {
    if (error) {
        console.error('Error finding table', error);
    } else {
    const allUsers = results;
    // console.log(allUsers)
    const loc = allUsers.findIndex(item => item.email === email)
        if (loc > -1) {
            console.log(loc)
            const auth = await bcrypt.compare(password, allUsers[loc].password).then(function (result) {
                console.log(result)
                if (result) {
                    const token = createToken(email)
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAgeS * 1000 })
                    res.cookie('user', allUsers[loc].username, { maxAge: maxAgeS * 1000 })
                    res.cookie('role', allUsers[loc].role, { maxAge: maxAgeS * 1000 })
                    res.status(200).json({
                        user: allUsers[loc].username,
                        msg: "Login Successful",
                        status: true
                    })
                 } else res.status(200).json({ 
                    user: 'Guest',
                    msg: "Password incorrect",
                    status: false 
                })
                })
            } else res.status(200).json({ 
                user: 'Guest',
                msg: "User does not exist",
                status: false 
            })
        }
    })
    connection.end
    // res.send('login')
}

module.exports.logout_get = async (req, res) => {
    console.log('Logging Out')
    res.cookie('jwt', '', { maxAge: 1 })
    res.send({msg: 'Logged Out'})
}

module.exports.get_admin_status = (req, res) => {
    console.log(req.cookies)
    res.send(req.cookies)
}

module.exports.forgot_password = (req, res) => {
    const { email } = req.body
    console.log(email)
    connection.connect()
    connection.query(`DELETE FROM users WHERE email = ?`, email, (error, results, fields) => {
        if (error) {
            console.error('Error finding table', error);
        } else {
            res.send({msg:`${email} deleted successfully. You can now re-create the account`})
        }
    })
    connection.end
   
}