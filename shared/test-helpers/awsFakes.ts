export const fakeProxy = {
  body: null,
  headers: null,
  multiValueHeaders: null,
  httpMethod: 'get',
  isBase64Encoded: false,
  path: '/foo',
  pathParameters: null,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: null,
  resource: 'fooresource',
};

export const fakeContext = {
  callbackWaitsForEmptyEventLoop: true,
  functionName: 'foo',
  functionVersion: 'a',
  invokedFunctionArn: 'foo',
  memoryLimitInMB: 1,
  awsRequestId: 'foo',
  logGroupName: 'foo',
  logStreamName: 'foo',

  // Functions
  getRemainingTimeInMillis: () => 1000,
  done: () => null,
  fail: () => null,
  succeed: s => null,
};
