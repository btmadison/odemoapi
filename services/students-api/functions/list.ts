import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context } from 'aws-lambda';
import { success, failure } from '../../../shared-libs/response';
import { searchStudents } from '../services/studentService';

require('dotenv').config();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {
  if (event.queryStringParameters && event.queryStringParameters.q) {
    try {
      console.log('query students with ' + event.queryStringParameters.q);
      const students = await getStudents(event.queryStringParameters.q);
      if (students) {
        return success({
          data: students,
        });
      }
    } catch (ex) {
      return failure(ex);
    }
  }
};

const getStudents = async query => {
  return await searchStudents(query);
};
