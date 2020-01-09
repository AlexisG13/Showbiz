import { createParamDecorator } from '@nestjs/common';

export const GetToken = createParamDecorator((data, req) => {
  return req.headers.authorization.split(' ')[1];
});
