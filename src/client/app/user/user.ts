export interface User {
  firstName: string;
  lastName: string;
  midName?: string;
  dept: string;
  faculty?: string;
  birthday: Date;

  profile: {
    cadetId?: string;
    staffId?: string;
    RC?: number;
    position?: string[];
    CV?: string[];
  };
}
