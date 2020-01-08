import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesRepository } from './repositories/movies.repository';
import { TagsRepository } from 'src/tags/repositories/tags.repository';

@Module({
  providers: [MoviesService],
  controllers: [MoviesController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([MoviesRepository]),
    TypeOrmModule.forFeature([TagsRepository]),
  ],
})
export class MoviesModule {}
