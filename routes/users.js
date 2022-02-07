import express from 'express';

import { v4 as uuidv4 } from 'uuid';
uuidv4(); 

const router = express.Router();

let users = [
    // {
    //     firstName: "Shawn",
    //     lastName: "Cruz",
    //     age: 24,
    //     id: 1
    //  },
    //  {
    //     firstName: "Will",
    //     lastName: "Smith",
    //     age: 24,
    //     id: 2
    //  }
]

// all routes here are starting with /users
router.get('/', (req, res) => {
    res.send(users);
});

router.post('/', (req, res) => {

    const user = req.body;

    const userId = uuidv4(); 

    const userWithId = { ...user, id: userId }

    users.push(userWithId);

    res.send(`User with the name ${user.firstName} added to the database`);
});

// /users/.... will get as params
router.get('/:id', (req, res) => {

    // console.log(req.params)

    const { id } = req.params

    const foundUser = users.find((user) => user.id == id);

    res.send(foundUser)

});

router.delete('/:id', (req, res) => {

    // console.log(req.params)

    const { id } = req.params

    users = users.filter((user) => user.id !== id);

    res.send(`Use with the id ${id} deleted from the database`)

});

router.patch('/:id', (req, res) => {

    // console.log(req.params)

    const { id } = req.params

    const user = users.find((user) => user.id === id);

    const { firstName, lastName, age } = req.body 

    if(firstName){
        user.firstName = firstName
    }

    if(lastName){
        user.lastName = lastName
    }

    if(age){
        user.age = age
    }

    res.send(`Use with the id ${id} deleted from the database`)

});


export default router;