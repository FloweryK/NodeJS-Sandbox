const express = require('express');
const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello world!\n');
});

app.get('/users', (req, res) => {
    return res.json(users);
});

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if(!id){
        return res.status(400).json({err: 'Incorrect Id'});
    }

    let user = users.filter(user => user.id === id)[0]
    if (!user) {
        return res.status(404).json({err: 'Unknown user'});
    }

    return res.json(user);
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});


let users = [
    {
        id: 1,
        name: 'Alice'
    },
    {
        id: 2,
        name: 'Bob'
    },
    {
        id: 3,
        name: 'Cathy'
    }
]