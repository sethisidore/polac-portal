export interface User {
  name: () => string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthday: Date;

  department: string;
  faculty?: string;

  _id: string;
  username: string;
  email: string;
  password?: string;
  profile: PrivateProfile;
}

interface PrivateProfile {
  cadetId?: string;
  RC?: number;
  squad?: number;

  staffId?: string;
  position?: string[];
  qualifications: string[];
}
