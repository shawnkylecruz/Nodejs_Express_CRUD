import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import usersRoutes from './routes/users.js';

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeexpressdatabase'
});

mysqlConnection.connect((err) => {
    if(!err)
        console.log('DB connection succeeded');
    else
        console.log('DB connection failed \n Error : '+ JSON.stringify(err,undefined,2));
});

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

app.use('/users', usersRoutes);

app.get('/', (req, res) => res.send('Hello from Homepage!'));

app.listen(PORT, () => console.log(`Server Runnning on port: http://localhost:${PORT}`));