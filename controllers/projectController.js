const mysql = require('mysql2')
const connection = require('./mySQL')
const cookie = require('cookie')

//functions

//modules
module.exports.get_project_data = (req,res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let x = req.params.id;
    connection.connect()
    connection.query('SELECT * FROM projects', (error, results, fields) => {
        if (error) {
            console.error('Error finding table', error);
        } else {
            const tableData = results;
            for (let i = 0; i < tableData.length; i++) {
                if (tableData[i].id == x) y = i; 
            }
            res.send(tableData[y])
        }
    })
    connection.end
}

module.exports.get_all_projects = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    //let x = req.params.id;
    connection.connect()
    connection.query('SELECT * FROM projects', (error, results, fields) => {
        if (error) {
            console.error('Error finding table', error);
        } else {
            const tableData = results;
            res.send(tableData)
        }
    })
    connection.end
}

module.exports.add_project = (req,res) => {
    const { name, manager, shiftA1, shiftA2, shiftA3, shiftB1, shiftB2, shiftB3, dsceA1, dsceB1, dsceA2, dsceB2, summary, active } = req.body
    let newProj = {
        name:name,
        manager:manager,
        shiftA1:shiftA1,
        shiftA2:shiftA2,
        shiftA3:shiftA3,
        shiftB1:shiftB1,
        shiftB2:shiftB2,
        shiftB3:shiftB3,
        dsceA1:dsceA1,
        dsceB1:dsceB1,
        dsceA2:dsceA2,
        dsceB2:dsceB2,
        summary:summary,
        active:active,
    }
    connection.connect()
    connection.query('SELECT * FROM projects', (error, results, fields) => {
        if (error) {
            console.error('Error finding table', error);
        } else {
            if (results.length == 0) {
                newProj.id = 1;
            }
            else newProj.id = results[results.length-1].id+1
            // const tableData = results;
            connection.query('INSERT INTO projects SET ?', newProj, (error, results, fields) => {
                if (error) {
                    console.error('Error inserting new project:', error);
                } else {
                    console.log('New project inserted successfully.', results.insertId);
                }
            })
            output = {
                msg:'Project added successfully!'
            }
            res.send(output)
        }
    })
    connection.end
}

module.exports.edit_project = (req,res) => {
    let id = 0;
    connection.connect()
    connection.query('SELECT * FROM projects', (error, results, fields) => {
        if (error) {
            console.error('Error finding table', error);
        } else {
            for (i = 0; i < results.length; i++) {
                if (results[i].name == req.params.name) { id = results[i].id; console.log(`ID for ${req.params.name} = ${id}`); break; }
            }
            const updateQuery = `UPDATE projects SET name = '${req.body.name}', manager = '${req.body.manager}', shiftA1 = '${req.body.shiftA1}',
                                shiftA2 = '${req.body.shiftA2}', shiftA3 = '${req.body.shiftA3}', shiftB1 = '${req.body.shiftB1}',
                                shiftB2 = '${req.body.shiftB2}', shiftB3 = '${req.body.shiftB3}', dsceA1 = '${req.body.dsceA1}', dsceA2 = '${req.body.dsceA2}',
                                dsceB1 = '${req.body.dsceB1}', dsceB2 = '${req.body.dsceB2}', summary = '${req.body.summary}', active =  '${req.body.active}'
                                WHERE id = '${id}'`
            connection.query(updateQuery, (error, results, fields) => {
                if (error) console.error('Error updating', error);
                else { console.log('Entry updated successfully'); output = { msg: 'Edit Successful' }; res.send(output) }
            })
        }
    })
    connection.end
}

module.exports.delete_project = (req, res) => {
    connection.connect()
    connection.query('DELETE FROM projects WHERE name = ?', req.params.name, (error, results, fields) => {
        if (error) {
            console.error('Error deleting entry:', error)
        }
        else {
            console.log('Entry deleted successfully')
        } 
    })
    connection.end
    // Send the comment back to user
    output = {
        msg:'Complete'
    }
    res.send(output)
}

module.exports.get_project_comments = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let x = req.params.id;
    connection.connect()
    connection.query(`SELECT * FROM comments WHERE PID = ${x}`, (error, results, fields) => {
        if (error) {
            console.error('Error finding table', error);
        } else {
            const tableData = results;
            res.send(tableData)
        }
    })
    connection.end
}

module.exports.get_project_id = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let x = req.params.name
    connection.connect()
    connection.query(`SELECT * FROM projects WHERE name = '${x}'`, (error, results, fields) => {
        if (error) {
            console.error('Error finding table', error);
        } else {
            const tableData = results;
            res.send(tableData)
        }
    })
    connection.end
}

