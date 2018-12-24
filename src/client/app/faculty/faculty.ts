import { User } from '@app/user/user';

export interface Faculty {
  _id?: string;
  facultyId: string|number;
  name: string;
  dean?: User;
}
