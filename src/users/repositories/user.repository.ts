import { User } from '../entities/users.entity';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from 'src/auth/dto/auth.credentials.dto';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { PasswordChangeDto } from '../dto/password-change.dto';
import { Role } from '../entities/role.entity';
import { LoginCredentialsDto } from 'src/auth/dto/login-credentials.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto, role: Role): Promise<User> {
    const { username, password, email } = authCredentialsDto;
    const exists = await this.findOne({ username });
    if (exists) {
      throw new ConflictException('User already exists');
    }
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const user = { username, email, password: hashedPassword, salt, role };
    return this.save(user);
  }

  async validatePassword(loginCredentials: LoginCredentialsDto): Promise<User | null> {
    const { username, password } = loginCredentials;
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return user;
    }
    return null;
  }

  async changePassword(user: User, passwordDto: PasswordChangeDto): Promise<void> {
    const validate = user.validatePassword(passwordDto.password);
    if (!validate) {
      throw new UnauthorizedException('Wrong password');
    }
    const salt = await genSalt();
    const hashedPassword = await hash(passwordDto.newPassword, salt);
    user.password = hashedPassword;
    user.salt = salt;
    this.save(user);
  }
}
