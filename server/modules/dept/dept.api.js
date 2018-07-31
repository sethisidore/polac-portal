const express = require('express');
let router = express.Router;

router.get('/dept', function allCourses(req, res, next) {
    res.render('NOT YET IMPLEMENTED!');
})
router.get('/dept/:id', function deptDetail(req, res, next) {
    res.render('NOT YET IMPLEMENTED!');
});
router.post('/dept/create', function addDept(req, res, next) {
    res.render('NOT YET IMPLEMENTED!');
});
router.delete('/dept/:id', function delDept(req, res, next) {
    res.render('NOT YET IMPLEMENTED!');
});

module.exports = router;