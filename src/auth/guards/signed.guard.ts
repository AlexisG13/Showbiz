import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/users/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JWT } from 'src/users/entities/jwt.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SignedGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(JWT)
    private readonly jwtRepository: Repository<JWT>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    if (await this.jwtRepository.findOne({ jwt: token })) {
      return true;
    }
    return false;
  }
}
