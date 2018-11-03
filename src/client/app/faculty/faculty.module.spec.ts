import { FacultyModule } from './faculty.module';

describe('FacultyModule', () => {
  let facultyModule: FacultyModule;

  beforeEach(() => {
    facultyModule = new FacultyModule();
  });

  it('should create an instance', () => {
    expect(facultyModule).toBeTruthy();
  });
});
