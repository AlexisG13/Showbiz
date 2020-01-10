import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TagsRepository } from './repositories/tags.repository';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [TypeOrmModule.forFeature([TagsRepository]), AuthModule],
})
export class TagsModule {}
