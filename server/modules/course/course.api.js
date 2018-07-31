const express = require('express');
let router = express.Router;

router.get('/courses', function allCourses(req, res, next) {
    res.render('NOT YET IMPLEMENTED!');
})
router.get('/courses/:id', function courseDetail(req, res, next) {
    res.render('NOT YET IMPLEMENTED!');
});
router.post('/courses/create', function addCourse(req, res, next) {
    res.render('NOT YET IMPLEMENTED!');
});
router.delete('/courses/:id', function delCourse(req, res, next) {
    res.render('NOT YET IMPLEMENTED!');
});

module.exports = router;