import { handler } from './get';
import * as awsfakes from '../../../../shared/test-helpers/awsFakes';
jest.mock('../services/studentService');

test('should return 404 not found when path params are not specified as required', async () => {
  const result = await handler(awsfakes.fakeProxy, awsfakes.fakeContext, null);
  expect(result['statusCode']).toBe(404);
});
