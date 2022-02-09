import express from 'express';
import mysql from 'mysql';

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeexpressdatabase'
});

const router = express.Router();

// Get All
router.get('/', (req, res) => {
    // res.send(users);
    mysqlConnection.query('SELECT * FROM tblEmployees',(err, rows, fields) => {
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});

// Get by Parameter
router.get('/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM tblEmployees WHERE id = ?',[req.params.id],(err, rows, fields) => {
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});

// Create
router.post('/', (req, res) => {
    const userId = req.body.id
    let userFirstName = req.body.firstName
    let userLastName = req.body.lastName
    let userAge = req.body.age
    
    // if (req.body.id !== ''){
    //     res.send(`You cannot manually insert ID to the Database`);
    //     throw new Error('You cannot manually insert ID to the Database');
    // }

    if((userFirstName == undefined)&&(userLastName == undefined)&&(userAge == undefined)){
        throw new Error(`Please enter valid details for updating ID ${req.params.id}`);
    }

    if (userFirstName == undefined){userFirstName = ""}
    if (userLastName == undefined){userLastName = ""}
    if (userAge == undefined){userAge = ""}
    

    mysqlConnection.query("INSERT INTO tblEmployees (id,firstName,lastName,age) VALUES ('" + userId + "','" + userFirstName + "', '" + userLastName + "', '" + userAge + "');" ,(err, rows, fields) => {
            if(!err)
                res.send(`User with the name ${userFirstName} ${userLastName} added to the database`);
            else
                console.log(err);
    })
});


// Delete
router.delete('/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM tblEmployees WHERE id = ?',[req.params.id],(err, rows, fields) => {
        if(!err)
            res.send(`Use with the id ${req.params.id} deleted from the database`);
        else
            console.log(err);
    })
});

// Edit
router.patch('/:id', (req, res) => {

    const userFirstName = req.body.firstName
    const userLastName = req.body.lastName
    const userAge = req.body.age

    const { firstName, lastName, age } = req.body
    
    if((userFirstName == undefined)&&(userLastName == undefined)&&(userAge == undefined)){
        throw new Error(`Please enter valid details for updating ID ${req.params.id}`);
    }

    if(userFirstName !== undefined){
        mysqlConnection.query('UPDATE tblEmployees SET firstName = ? WHERE id = ?',[firstName, req.params.id],(err, rows, fields) => {
            if(err)
            console.log(err);
        })
    };

    if(userLastName !== undefined){
        mysqlConnection.query('UPDATE tblEmployees SET lastName = ? WHERE id = ?',[lastName, req.params.id],(err, rows, fields) => {
            if(err)
            console.log(err);
        })
    };

    if(userAge !== undefined){
        mysqlConnection.query('UPDATE tblEmployees SET age = userAge WHERE id = ?',[userAge, req.params.id],(err, rows, fields) => {
            if(!err)
            console.log(err);
        })
    };

    res.send(`User with the ID ${req.params.id} is updated in the database`);

});


export default router;