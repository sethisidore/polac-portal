export interface User {
  fullname: () => string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthday: Date;
  gender: string;

  department: string;
  faculty?: string;

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
  RC: number;
  squad: number;
  result?: string[];
}

interface Staff {
  staffId: string;
  position: string[];
  qualifications: string[];
}
