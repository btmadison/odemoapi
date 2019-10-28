import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context } from 'aws-lambda';
import { success, notFound, failure } from '../../../../shared/src/response';
import { getStudentById } from '../services/studentService';
import { Student } from '../models/student';

require('dotenv').config();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {
  if (event.pathParameters && event.pathParameters.id) {
    try {
      const student = await getStudent(+event.pathParameters.id);
      if (student) {
        return success({
          data: student,
        });
      }
    } catch (ex) {
      return failure(ex);
    }
  }

  return notFound({ message: 'Not Found' });
};

const getStudent = async (id: number): Promise<Student> => {
  return await getStudentById(id);
};
