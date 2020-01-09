import { createParamDecorator } from '@nestjs/common';
import { User } from '../entities/users.entity';

export const VerifyRole = createParamDecorator((data, req): boolean => {
  const user: User = req.user;
  if (user.role) {
    return true;
  }
});
