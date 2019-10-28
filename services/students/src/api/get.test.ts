import { handler } from './get';
import * as awsfakes from '../../../../shared/test-helpers/awsFakes';

import { getStudentById } from '../services/studentService';

jest.mock('../services/studentService', () => ({
  getStudentById: jest.fn().mockImplementation(id => (id === 1 ? 'foo' : undefined)),
}));

test('should return 404 not found when path params are not specified as required', async () => {
  const result = await handler(awsfakes.fakeEvent, awsfakes.fakeContext, null);
  expect(result['statusCode']).toBe(404);
});

test('should get student by id when an id path param is supplied', async () => {
  awsfakes.fakeEvent.pathParameters = { id: 1 };
  const result = await handler(awsfakes.fakeEvent, awsfakes.fakeContext, null);
  expect(getStudentById).toHaveBeenCalledWith(1);
  expect(result['statusCode']).toBe(200);
});

test('should return 404 when student not found', async () => {
  awsfakes.fakeEvent.pathParameters = { id: 0 };
  const result = await handler(awsfakes.fakeEvent, awsfakes.fakeContext, null);
  expect(getStudentById).toHaveBeenCalledWith(1);
  expect(result['statusCode']).toBe(404);
});
