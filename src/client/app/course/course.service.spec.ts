import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { CourseService } from './course.service';
import { Course } from './course';


describe('CourseService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CourseService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test Starts
  describe('#getAll', () => {
    let expectedCourses: Course[];
    beforeEach(() => {
      expectedCourses = [
        { title: 'Introduction to Mechanics', courseId: 'phy102', creditLoad: 3, level: 1, semester: 'second' },
        { title: 'Data Structures and Algorithm', courseId: 'csc302', creditLoad: 3, level: 3, semester: 'first' }
      ];
    });
    it('Should return all expected courses (called once)', () => {
      service.getAll().subscribe((courses) => {
        expect(courses).toEqual(expectedCourses, 'Should return expected courses');
        expect(courses.length).toEqual(2);
      }, fail);

      const req = httpTestingController.expectOne(service.courseUrl); // make one request
      expect(req.request.method).toEqual('GET');

      req.flush(expectedCourses); // respond  with expected courses
    });

    it('Should be ok return no course', () => {
      service.getAll().subscribe(
        courses => expect(courses.length).toEqual(0, 'should be ok return empty array'),
        fail
      );
      const req = httpTestingController.expectOne(service.courseUrl);
      req.flush([]); // respond with empty courses
    });

    it('should return courses (called many times)', () => {
      service.getAll().subscribe();
      service.getAll().subscribe();
      service.getAll().subscribe(
        courses => expect(courses).toEqual(expectedCourses, 'should return expected courses'),
        fail
      );

      const req = httpTestingController.match(service.courseUrl);
      expect(req.length).toEqual(3, 'calls made to getAll()');

      // respond to requests
      req[0].flush([]);
      req[1].flush(expectedCourses[0]);
      req[2].flush(expectedCourses);
    });
  });

  describe('#getOne', () => {
    let course: Course;
    beforeEach(() => {
      course = { courseId: 'csc302', title: 'Data Structures & Algorithms', creditLoad: 3, level: 3, semester: 'second' };
    });

    it('should get a course by a given id', () => {
      const courseId = 'csc302';
      service.getOne(courseId).subscribe(
        response => expect(response).toEqual(course, 'should return course by given id'),
        fail
      );
      const url = `${service.courseUrl}/${courseId}`;
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(course);
    });

    it('should error 404 when no course is found by given id', () => {
      const courseId = 'mth402';
      service.getOne(courseId).subscribe(
        fail,
        error => expect(error).toBeDefined()
      );
    });
  });

  describe('#createOne', () => {
    const course: Course[] = [
      { courseId: 'csc302', title: 'Data Structures & Algorithms', creditLoad: 3, level: 3, semester: 'second' }
    ];

    it('should create a course with valid inputs', () => {
      const newCourse: Course = { courseId: 'psy101', level: 1, semester: 'first', creditLoad: 2,
            assignedTo: ['Mel Gibson', 'Selena Gomez'], title: 'Introductory Psychology',
            department: 'Psychology' };
      service.createOne(newCourse).subscribe((resp) => {
        course.push(resp);
        expect(course.length).toEqual(2);
        expect(newCourse).toEqual(resp);
        }, fail);

        const req = httpTestingController.expectOne(service.courseUrl);
        expect(req.request.method).toEqual('POST');
        req.flush(course);
    });
  });

  describe('#deleteOne', () => {
    const course: Course[] = [
      { courseId: 'csc302', title: 'Data Structures & Algorithms', creditLoad: 3, level: 3, semester: 'second' }
    ];
    it('should delete a course by a given Id', () => {
      service.deleteOne('csc302').subscribe((resp) => {
        expect(resp).toEqual(course[0]);
        expect(course.pop()).toEqual(resp, 'should match the course deleted');
        expect(course.length).toEqual(0, 'Should delete course given by an id');
      }, fail);

      const req = httpTestingController.expectOne(service.courseUrl);
      expect(req.request.method).toEqual('DELETE');
      req.flush(course);
    });
  });

  describe('#updateOne', () => {
    const course: Course[] = [
      { courseId: 'csc302', title: 'Data Structures & Algorithms', creditLoad: 3, level: 3, semester: 'second' }
    ];
    it('should update a course given by an id', () => {
      const updatedCourse: Course = {
        courseId: 'csc302', title: 'Data', creditLoad: 4, level: 4, semester: 'first',
        department: 'Computer Science', assignedTo: ['Gibson Mel']
      };
      service.updateOne('csc302', updatedCourse).subscribe((resp) => {
        expect(updatedCourse).toEqual(resp);
      }, fail);

      const req = httpTestingController.expectOne(service.courseUrl);
      expect(req.request.method).toEqual('PUT');
      req.flush(course);
    });
  });
});
