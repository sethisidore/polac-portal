import { Department } from '@app/department/department';
import { Faculty } from '@app/faculty/faculty';

export interface User {
  fullname: () => string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthday: Date;
  gender: string;

  department: string | Department;
  faculty?: string | Faculty;

  _id?: string;
  _type: string;
  username: string;
  email: string;
  password?: string;
  cadetDetail?: Cadet;
  staffDetail?: Staff;
}

interface Cadet {
  cadetId: string;
  regularCourse: number;
  squad: number;
  results?: string[];
}

interface Staff {
  staffId: string;
  position: string[];
  qualifications: string[];
}
