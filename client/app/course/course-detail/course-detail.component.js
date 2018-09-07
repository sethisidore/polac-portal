angular.module('course').component('courseDetail', {
  templateUrl: './modules/course/course-detail/course-detail.html',
  controller: 'CourseDetailController as courseData',
});

function CourseDetailController() {
  const courseData = this;
  courseData.tagline = 'This will show details of a particular course';
}
