import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [UsersModule, MoviesModule, TypeOrmModule.forRoot(), TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
