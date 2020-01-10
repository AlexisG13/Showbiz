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
  UseGuards,
} from '@nestjs/common';
import { Tag } from './entities/tags.entity';
import { TagsService } from './tags.service';
import { TagDto } from './dto/tag.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/role.guard';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getAllTags(): Promise<Tag[]> {
    return this.tagsService.getAllTags();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getSingleTag(@Param('id') tagId: number): Promise<Tag> {
    return this.getSingleTag(tagId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  addTag(@Body() tag: TagDto): Promise<Tag> {
    return this.tagsService.addTag(tag);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  updateTag(@Body() tag: TagDto, @Param('id') tagId: number): Promise<Tag> {
    return this.tagsService.updateTag(tag, tagId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  deleteTag(@Param('id') tagId: number): Promise<void> {
    return this.tagsService.deleteTag(tagId);
  }
}
