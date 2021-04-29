const express = require('express');
const router = express.Router();


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

/* get */
router.get('/', (req, res) => {
    return res.json(users);
});

router.get('/:id', (req, res) => {
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

/* delete */
router.delete('/:id', (req, res) => {
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

/* post */
router.post('/', (req, res) => {
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


module.exports = router;
