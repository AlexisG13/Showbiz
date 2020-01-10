import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';
import { Repository } from 'typeorm';
import { TagDto } from './dto/tag.dto';
import { TagsRepository } from './repositories/tags.repository';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsRepository)
    private readonly tagsRepository: TagsRepository,
  ) {}

  getAllTags(): Promise<Tag[]> {
    return this.tagsRepository.find();
  }

  async getSingleTag(tagId: number): Promise<Tag> {
    const tag = await this.tagsRepository.findOne({ id: tagId });
    if (!tag) {
      throw new NotFoundException('The tag does not exist');
    }
    return tag;
  }

  async addTag(tag: TagDto): Promise<Tag> {
    if (await this.tagsRepository.findOne({ title: tag.title })) {
      throw new ConflictException('The tag already exists');
    }
    return this.tagsRepository.save({ title: tag.title });
  }

  async updateTag(tagDto: TagDto, tagId: number): Promise<Tag> {
    const tag = await this.tagsRepository.findOne({ id: tagId });
    if (!tag) {
      throw new NotFoundException('The tag does not exist');
    }
    tag.title = tagDto.title;
    return this.tagsRepository.save(tag);
  }

  async deleteTag(tagId: number): Promise<void> {
    const tag = await this.tagsRepository.findOne({ id: tagId });
    if (!tag) {
      throw new NotFoundException('The tag does not exist');
    }
    tag.isActive = false;
    this.tagsRepository.save(tag);
    return;
  }
}
