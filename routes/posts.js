const express = require('express');
const router = express.Router();

/* GET post index /posts */
router.get('/', (req, res, next) => {
    res.send('/posts');
});

module.exports = router;
