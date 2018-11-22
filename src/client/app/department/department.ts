export interface Department {
  _id?: string;
  deptId: number;
  name: string;
  headOfDepartment: string;
  accreditation?: {
    status: boolean;
    date: Date;
  };
}
