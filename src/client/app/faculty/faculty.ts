export interface Faculty {
  facultyId: string;
  name: string;
  dean?: string | Object;
  status?: {
    accredited: boolean;
    date: Date;
  };
}
