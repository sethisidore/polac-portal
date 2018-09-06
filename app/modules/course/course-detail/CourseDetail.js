angular.module('Course').component('courseDetail', {
  templateUrl: './modules/course/course-detail/course-detail.html',
  controller: 'CourseDetailController as CDctrl',
});

function CourseDetailController () {
  const CDctrl = this;
  CDctrl.tagline = 'This will show details of a particular course';
}
