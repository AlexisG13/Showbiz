import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/repositories/user.repository';
import { AuthCredentialsDto } from 'src/auth/dto/auth.credentials.dto';
import { AccessToken } from 'src/users/dto/access-token.dto';
import { PasswordChangeDto } from 'src/users/dto/password-change.dto';
import { User } from 'src/users/entities/users.entity';
import { JWT } from 'src/users/entities/jwt.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/users/entities/role.entity';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @InjectRepository(JWT)
    private readonly jwtRepository: Repository<JWT>,
    private readonly configService: ConfigService,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const role = await this.roleRepository.findOne({ title: 'client' });
    if (!role) {
      throw new NotFoundException('Role does not exist');
    }
    return this.usersRepository.signUp(authCredentialsDto, role);
  }

  async login(loginCredentials: LoginCredentialsDto): Promise<AccessToken> {
    const user = await this.usersRepository.validatePassword(loginCredentials);
    if (!user) {
      throw new UnauthorizedException('Wrong username or password');
    }
    const payload = { username: user.username };
    const accessToken = this.jwtService.sign(payload);
    this.jwtRepository.save({ user, jwt: accessToken });
    return { token: accessToken };
  }

  async logout(token: string): Promise<void> {
    await this.jwtRepository.delete({ jwt: token });
  }

  async changePassword(user: User, passwordDto: PasswordChangeDto): Promise<void> {
    return this.usersRepository.changePassword(user, passwordDto);
  }
}
