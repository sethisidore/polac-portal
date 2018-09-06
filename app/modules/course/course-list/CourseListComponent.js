angular.module('Course').component('courseList', {
  templateUrl: './modules/course/course-list/course-list.html',
  controller: 'CourseListController as CLctrl',
});

function CourseListController() {
  const Clctrl = this;
  Clctrl.tagline = 'GET all Cadets and place here';
}
