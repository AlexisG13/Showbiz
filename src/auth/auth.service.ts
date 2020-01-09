import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/repositories/user.repository';
import { AuthCredentialsDto } from 'src/users/dto/auth.credentials.dto';
import { AccessToken } from 'src/users/dto/access-token.dto';
import { PasswordChangeDto } from 'src/users/dto/password-change.dto';
import { User } from 'src/users/entities/users.entity';
import { JWT } from 'src/users/entities/jwt.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @InjectRepository(JWT)
    private readonly jwtRepository: Repository<JWT>,
    private readonly configService: ConfigService,
  ) {}
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.signUp(authCredentialsDto);
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<AccessToken> {
    const user = await this.usersRepository.validatePassword(authCredentialsDto);
    if (!user) {
      throw new UnauthorizedException('Wrong username or password');
    }
    const payload = { username: user.username };
    const accessToken = this.jwtService.sign(payload);
    const expMin = this.configService.get('JWT_EXPIRATION_TIME') as number;
    const currenTime = new Date().getTime();
    const expiration = new Date(currenTime + expMin * 60000);
    this.jwtRepository.save({ user, jwt: accessToken, expiration });
    return { token: accessToken };
  }

  async changePassword(user: User, passwordDto: PasswordChangeDto): Promise<void> {
    return this.usersRepository.changePassword(user, passwordDto);
  }
}
