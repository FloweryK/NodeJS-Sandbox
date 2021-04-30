const express = require('express');
const router = express.Router();

/* get */
router.get('/', (req, res) => {
    res.send('\nHello World!\n');
});

/* exports */
module.exports = router;
