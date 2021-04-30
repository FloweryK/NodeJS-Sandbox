const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const dbconfig = require('../config/db');
const connection = mysql.createConnection(dbconfig);

/* get */
router.get('/', (req, res) => {
    connection.query('select * from memos', (error, rows) => {
        if (error) throw error;
        res.send(rows);
    });
});

module.exports = router;
