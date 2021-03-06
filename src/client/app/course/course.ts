export interface Course {
  _id?: string;
  courseId: string;
  title: string;
  creditLoad: number;
  level: number;
  semester: string;
  department?: string;
  assignedTo?: string[];
}

export interface CourseOfferings {
  level: number;
  offerings: Course[];
  session: string | Date;
}
