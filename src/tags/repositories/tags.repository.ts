import { EntityRepository, Repository } from 'typeorm';
import { Tag } from '../entities/tags.entity';

@EntityRepository(Tag)
export class TagsRepository extends Repository<Tag> {}
