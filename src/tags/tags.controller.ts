import {
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { Tag } from './entities/tags.entity';
import { TagsService } from './tags.service';
import { TagDto } from './dto/tag.dto';
import { User } from 'src/users/entities/users.entity';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  getAllTags(): Promise<Tag[]> {
    return this.tagsService.getAllTags();
  }

  @Get(':id')
  getSingleTag(@Param('id') tagId: number): Promise<Tag> {
    return this.getSingleTag(tagId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  addTag(@Body() tag: TagDto): Promise<Tag> {
    return this.tagsService.addTag(tag);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  updateTag(@Body() tag: TagDto, @Param('id') tagId: number): Promise<Tag> {
    return this.tagsService.updateTag(tag, tagId);
  }

  @Delete(':id')
  deleteTag(@Param('id') tagId: number): Promise<void> {
    return this.tagsService.deleteTag(tagId);
  }
}
