import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { User } from 'src/users/entities/users.entity';
import { AccessToken } from './dto/access-token.dto';
import { PasswordChangeDto } from './dto/password-change.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.signUp(authCredentialsDto);
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<AccessToken> {
    const user = await this.usersRepository.validatePassword(
      authCredentialsDto,
    );
    if (!user) {
      throw new UnauthorizedException('Wrong username or password');
    }
    const payload = { username: user.username };
    const accessToken = this.jwtService.sign(payload);
    return { token: accessToken };
  }

  async changePassword(
    user: User,
    passwordDto: PasswordChangeDto,
  ): Promise<void> {
    return this.usersRepository.changePassword(user, passwordDto);
  }
}
