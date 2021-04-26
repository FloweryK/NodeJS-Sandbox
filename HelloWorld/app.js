const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
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

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if(!id){
        return res.status(400).json({err: 'Incorrect Id'});
    }

    let userIdx = users.findIndex(user => user.id === id)
    if (userIdx === -1) {
        return res.status(404).json({err: 'Unknown user'});
    }
    users.splice(userIdx, 1);
    res.status(202).send();
});

app.post('/users', (req, res) => {
    const name = req.body.name || '';

    if(!name.length){
        return res.status(400).json({err: 'Incorrect name'});
    }
    const id = users.reduce((maxId, user) => {
        return user.id > maxId ? user.id : maxId;
    }, 0) + 1;

    const newUser = {
        id: id,
        name: name
    };

    users.push(newUser);

    return res.status(201).json(newUser)
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