import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FacultyService } from './faculty.service';
import { Faculty } from './faculty';
import { User } from '@app/user/user';

describe('FacultyService', () => {
  let httpTestingController: HttpTestingController;
  let service: FacultyService;
  const Dean: User = {
    username: 'lsl',
    _type: 'staff',
    firstName: 'Baba',
    lastName: 'Rwanda',
    gender: 'male',
    department: 'Mathematics',
    email: 'babarwanda@email.com',
    fullname: () => Dean.middleName ?
      `${Dean.lastName} ${Dean.firstName} ${Dean.middleName}` : `${Dean.lastName} ${Dean.firstName}`,
    birthday: new Date('1995 12 1'),
    staffDetail: {
      position: ['Senior Lecturer'],
      staffId: 'st234',
      qualifications: ['Bsc. Mathematics - 2008'],
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [FacultyService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(FacultyService);
  });

  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    service = TestBed.get(FacultyService);
    expect(service).toBeTruthy();
  });

  describe('#getAll', () => {
    const faculties: Faculty[] = [
      { facultyId: 3 || 'sci', name: 'Science'},
      { facultyId: 'law' || 4, name: 'Law' }
    ];

    it('Should return all expected facultys (called once)', () => {
      service.getAll().subscribe((faculty) => {
        expect(faculty).toEqual(faculties, 'Should return expected facultys');
        expect(faculty.length).toEqual(2);
      }, fail);

      const req = httpTestingController.expectOne(service.facultyUrl); // make one request
      expect(req.request.method).toEqual('GET');

      req.flush(faculties); // respond  with expected facultys
    });

    it('Should be ok return no faculty', () => {
      service.getAll().subscribe(
        faculty => expect(faculty.length).toEqual(0, 'should be ok return empty array'),
        fail
      );
      const req = httpTestingController.expectOne(service.facultyUrl);
      req.flush([]); // respond with empty facultys
    });

    it('should return facultys (called many times)', () => {
      service.getAll().subscribe();
      service.getAll().subscribe();
      service.getAll().subscribe(
        faculty => expect(faculty).toEqual(faculties, 'should return expected facultys'),
        fail
      );

      const req = httpTestingController.match(service.facultyUrl);
      expect(req.length).toEqual(3, 'calls made to getAll()');

      // respond to requests
      req[0].flush([]);
      req[1].flush(faculties[0]);
      req[2].flush(faculties);
    });
  });

  describe('#createOne', () => {
    const faculty: Faculty[] = [
      { facultyId: 3, dean: Dean, name: 'Science' }
    ];

    it('should create a faculty with valid inputs', () => {
      const newfaculty: Faculty = { facultyId: 3, dean: Dean, name: 'Science' };
      service.createOne(newfaculty).subscribe((resp) => {
        faculty.push(resp);
        expect(faculty.length).toEqual(2);
        expect(newfaculty).toEqual(resp);
        }, fail);

      const req = httpTestingController.expectOne(service.facultyUrl);
      expect(req.request.method).toEqual('POST');
      req.flush(faculty);
    });
  });

  describe('#deleteOne', () => {
    const faculty: Faculty[] = [
      { facultyId: 3, dean: Dean, name: 'Science' }
    ];
    it('should delete a faculty by a given Id', () => {
      service.deleteOne('csc302').subscribe((resp) => {
        expect(resp).toEqual(faculty[0]);
        expect(faculty.pop()).toEqual(resp, 'should match the faculty deleted');
        expect(faculty.length).toEqual(0, 'Should delete faculty given by an id');
      }, fail);

      const req = httpTestingController.expectOne(`${service.facultyUrl}/3`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(faculty);
    });
  });

  describe('#updateOne', () => {
    const faculty: Faculty[] = [
      { facultyId: 3, dean: undefined, name: 'Science' }
    ];
    it('should update a faculty given by an id', () => {
      const updatedFaculty: Faculty = {
        facultyId: 'csc302', dean: Dean, name: 'Applied Science'
      };
      service.updateOne('csc302', updatedFaculty).subscribe((resp) => {
        expect(updatedFaculty).toEqual(resp);
      }, fail);

      const req = httpTestingController.expectOne(service.facultyUrl);
      expect(req.request.method).toEqual('PUT');
      req.flush(faculty);
    });
  });
});
