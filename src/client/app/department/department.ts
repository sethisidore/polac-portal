export interface Department {
  _id?: string;
  deptId: number|string;
  name: string;
  headOfDepartment: string;
  accreditation?: {
    status: boolean;
    date: Date;
  };
}
