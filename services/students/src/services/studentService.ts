import { readFileSync } from 'fs';
import { Student } from '../models/student';
import { Course } from '../models/course';

const mockStudentsFile = process.env.MOCK_STUDENT_DATA_FILE;

export const getStudentById = async (id: number): Promise<Student> => {
  if (mockStudentsFile) {
    console.log('Using Mock Data');
    return await getMockStudent(id);
  } else throw new Error('Method not implemented.');
};

export const searchStudents = async (query: string): Promise<Student[]> => {
  if (mockStudentsFile) {
    console.log('Using Mock Data');
    return await searchMockStudents(query);
  } else throw new Error('Method not implemented.');
};

const getMockStudent = async (id: number): Promise<Student> => {
  const { students, classes } = { ...getMockData() };
  const student = students.find(s => s.id === id);
  student.studentClasses.forEach(course => (course.name = classes[course.id]));
  if (student) {
    student.averageGpa = getAverageGpa(student.studentClasses);
    return student;
  }
  return null;
};

const searchMockStudents = async (query: string): Promise<Student[]> => {
  query = query
    .replace(/\s\s+/g, ' ')
    .trim()
    .toLowerCase();
  const students = getMockData().students;
  const filteredStudents = filterStudents(students, query);
  return filteredStudents.map(studentToSummary).sort(comparatorLastNameAsc);
};

const getMockData = () => {
  const bufferStudents = readFileSync(mockStudentsFile);
  const studentsMock = JSON.parse(bufferStudents.toString());
  return studentsMock as { students: Student[]; classes: any };
};

const studentToSummary = (student: Student): Student => {
  const { id, first, last, studentClasses } = { ...student };
  return {
    id,
    first,
    last,
    averageGpa: getAverageGpa(studentClasses),
  };
};

const comparatorLastNameAsc = (s1: Student, s2: Student) => {
  const last1 = s1.last.toUpperCase();
  const last2 = s2.last.toUpperCase();
  return last1 < last2 ? -1 : last1 > last2 ? 1 : 0;
};

const filterStudents = (students: Student[], query) =>
  students.filter(s => `${s.first.trim().toLowerCase()} ${s.last.trim().toLowerCase()}`.includes(query));

const getAverageGpa = (studentClasses: Course[]) => {
  const grades = studentClasses.map(c => c.grade);
  const avg = grades ? grades.reduce((a, c) => (c += a)) / grades.length : 0;
  return Math.round(avg * 100) / 100;
};
