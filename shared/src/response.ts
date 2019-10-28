export const success = body => buildResponse(200, body);
export const notFound = body => buildResponse(404, body);
export const failure = body => buildResponse(500, body);

const buildResponse = (statusCode: number, body: any) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
  body: JSON.stringify(body),
});
