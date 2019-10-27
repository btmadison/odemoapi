import { Course } from './course';

export class Student {
  id?: number;
  first: string;
  last: string;
  averageGpa: number;
  email?: string;
  studentClasses?: Course[];
}
