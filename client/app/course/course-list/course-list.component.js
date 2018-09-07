angular.module('course').component('courseList', {
  templateUrl: './app/course/course-list/course-list.html',
  controller: 'CourseListController as courseList',
});

function CourseListController() {
  const courseList = this;
  courseList.tagline = 'GET all Cadets and place here';
}
