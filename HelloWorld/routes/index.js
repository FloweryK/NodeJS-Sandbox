const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('\nHello World!\n')
});

module.exports = router;
