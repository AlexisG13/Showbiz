import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './repositories/user.repository';
import { ConfigModule } from '@nestjs/config';
import { Rent } from './entities/rent.entity';
import { MoviesRepository } from 'src/movies/repositories/movies.repository';
import { Order } from './entities/order.entity ';
import { AuthModule } from '../auth/auth.module';
import { Role } from './entities/role.entity';
import { JWT } from './entities/jwt.entity';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([UsersRepository, Rent, MoviesRepository, Order, Role, JWT]),
    AuthModule,
    ConfigModule,
    MoviesModule,
  ],
})
export class UsersModule {}
