export interface Faculty {
  _id?: string;
  facultyId: string|number;
  name: string;
  dean?: string | Object;
}
