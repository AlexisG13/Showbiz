import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesRepository } from './repositories/movies.repository';
import { TagsRepository } from 'src/tags/repositories/tags.repository';
import { UsersRepository } from 'src/users/repositories/user.repository';
import { JWT } from 'src/users/entities/jwt.entity';
import { Order } from 'src/users/entities/order.entity ';
import { Rent } from 'src/users/entities/rent.entity';

@Module({
  providers: [MoviesService],
  controllers: [MoviesController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([MoviesRepository, TagsRepository, UsersRepository, JWT, Rent, Order]),  
  ],
  exports: [MoviesService],
})
export class MoviesModule {}
