const express = require('express');
const router = express.Router({mergeParams : true});

/* GET review index /posts/:id/reviews */
router.get('/', (req, res, next) => {
    res.send('INDEX /posts/:id/reviews');
});

/* POST review create /posts/:id/reviews/:review_id */
router.post('/', (req, res, next) => {
    res.send('CREATE /posts/:id/reviews');
});

/* EDIT review edit /posts/:id/reviews/:review_id/edit */
router.get('/:review_id/edit', (req, res, next) => {
    res.send('EDIT /posts/:id/reviews/:review_id/edit');
});

/* PUT review update /posts/:id/reviews/:review_id */
router.put('/:review_id', (req, res, next) => {
    res.send('UPDATE /posts/:id/reviews/:review_id');
});

/* DELETE  review delete /posts/:id/reviews/:id */
router.delete('/:review_id', (req, res, next) => {
    res.send('DELETE /posts/:id/reviews/:id');
});

module.exports = router;
