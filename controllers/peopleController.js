const mysql = require('mysql2')
const connection = require('./mySQL')
const { showPeople, showPerson } = require('../public/js/people')

module.exports.search = (req, res) => {
    // const qry = req.body.search.toLowerCase()
    const qry = req.body.search.toLowerCase()
    console.log(qry)
    console.log('hi')
    connection.connect()
    connection.query('SELECT * FROM people', (error, results, fields) => {
        if (error) {
            console.error('Error finding table', error);
        } else {
            const tableData = results;
            console.log(results)
            const people = tableData.filter((p) => p.id.toLowerCase().includes(qry))
            const people2 = tableData.filter((p) => p.name.toLowerCase().includes(qry))
            const people3 = tableData.filter((p) => p.position.toLowerCase().includes(qry))
            const people4 = tableData.filter((p) => p.tags.toLowerCase().includes(qry))
            const peopleNames = people2.map(obj => obj.name)
            const peopleTags = people4.map(obj => obj.name)
            const peopleIDs = people.map(obj => obj.name)
            const peoplePos = people3.map(obj => obj.name)
            const allNames = [...peopleNames, ...peopleTags, ...peopleIDs, ...peoplePos]
            const allNamesFiltered = allNames.filter((item, index, array) => array.indexOf(item) === index)
            res.send(showPeople(allNamesFiltered))
        }
    })
    connection.end
}
    
module.exports.id = (req,res) => {
    const { id } = req.params
    connection.connect()
    connection.query('SELECT * FROM people', (error, results, fields) => {
        if (error) {
            console.error('Error finding table', error);
        } else {
            const tableData = results;
            const person = tableData.find((b) => b.id === id)
            res.send(showPerson(person))
        }
    })
    connection.end
}

module.exports.user = (req, res) => {
    const { id } = req.body
    connection.connect()
    connection.query('SELECT * FROM people', (error, results, fields) => {
        if (error) {
            console.error('Error finding table', error);
        } else {
            const tableData = results;
            const person = tableData.find((b) => b.id === id)
            res.send(showPerson(person))
        }
    })
    connection.end

}
// module.exports.peopleList
