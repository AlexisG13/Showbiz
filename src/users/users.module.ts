import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './repositories/user.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Rent } from './entities/rent.entity';
import { MoviesRepository } from 'src/movies/repositories/movies.repository';
import { Order } from './entities/order.entity ';
import { NewRentSuscriber } from './suscribers/new-rent.suscriber';

@Module({
  providers: [UsersService, NewRentSuscriber],
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([UsersRepository, Rent, MoviesRepository, Order]),
    AuthModule,
    ConfigModule,
  ],
})
export class UsersModule {}
