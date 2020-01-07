import { Module } from '@nestjs/common';
import { MoviesModule } from 'src/movies/movies.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {
  imports: [MoviesModule];
}
