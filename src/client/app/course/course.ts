export interface Course {
  _id?: string;
  courseId: string;
  title: string;
  creditLoad: number;
  department?: string;
  assignedTo?: string[];
}
