import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/repositories/user.repository';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';

@Module({
  providers: [JwtStrategy, AuthService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  exports: [JwtStrategy, AuthService],
})
export class AuthModule {}
