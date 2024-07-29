const path = require('path')
const os = require('os')
const fs = require('fs')
const EventEmitter = require('events')
const cors = require("cors")

module.exports.open_pp = (req, res) => {
    const f = req.params.file
    console.log(f)
    const filePath = path.join(__dirname, `../public/files/library/${f}`)
    // console.log(filePath)
    res.sendFile(filePath)
}
