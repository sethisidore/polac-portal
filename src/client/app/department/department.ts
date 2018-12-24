import { User } from '@app/user/user';

export interface Department {
  _id?: string;
  deptId: number|string;
  name: string;
  headOfDepartment: User;
  status?: {
    accredited: boolean;
    date: Date;
  };
}
