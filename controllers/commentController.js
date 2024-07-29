const Joi = require('joi')
const mysql = require('mysql2')
const connection = require('./mySQL')
const cookie = require('cookie')
const multer = require('multer')

// functions


// modules
module.exports.comment_post = (req, res) => {
    const cookies = cookie.parse(req.headers.cookie || '');
    let newCom = {
        id: 0,
        name: cookies.user,
        msg: req.body.msg,
        PID: req.body.PID
    }
    console.log(newCom.name)
    // console.log(newCom)
    // Insert Object into DB
    connection.connect()
    connection.query('SELECT * FROM comments', (error, results, fields) => {
        if (error) {
            console.error('Error finding table', error);
        } else {
            if (results.length == 0) {
                newCom.id = 1;
            }
            else newCom.id = results[results.length-1].id+1
            const tableData = results;
            connection.query('INSERT INTO comments SET ?', newCom, (error, results, fields) => {
                if (error) {
                    console.error('Error inserting new comment:', error);
                } else {
                    console.log('New com inserted successfully.', results.insertId);
                }
            })
            tableData.push(newCom)
        }
    })
    connection.end
        // connection.query(`SELECT * FROM comments WHERE PID = ${newCom.PID}`, (error, results, fields) => {
        //     if (error) {
        //         console.error('Error finding table', error);
        //     } else {
        //         sendData = results;
        //         // console.log(sendData)
        //         res.send(sendData)
        //     }
        // })
}

module.exports.comment_get = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    // Retrieve comments table
    connection.connect()
    connection.query('SELECT * FROM comments', (error, results, fields) => {
        if (error) {
            console.error('Error finding table', error);
        } else {
            const tableData = results;
            //   console.log(tableData);
            res.send(tableData)
        }
    })
    connection.end
}

module.exports.image_upload = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

}