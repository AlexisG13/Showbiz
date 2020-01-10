import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TagsService } from '../tags.service';
import { TagsRepository } from '../repositories/tags.repository';
const mockTagsRepository = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
});

const mockTag = {
  id: 0,
  title: 'Test title',
  isActive: true,
  createDate: new Date(),
  updateDate: new Date(),
};

const mockAddTag = {
  title: 'Test tag title',
};

describe('TagsService', () => {
  let tagsService: TagsService;
  let tagsRepository: TagsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagsService, { provide: TagsRepository, useFactory: mockTagsRepository }],
    }).compile();

    tagsService = module.get<TagsService>(TagsService);
    tagsRepository = module.get<TagsRepository>(TagsRepository);
  });

  it('should be defined', () => {
    expect(tagsService).toBeDefined();
    expect(tagsRepository).toBeDefined();
  });

  describe('getAllTags', () => {
    it('get all tags from the repository', async () => {
      (tagsRepository.find as jest.Mock).mockResolvedValue('Returns all tags');
      expect(tagsRepository.find).not.toHaveBeenCalled();
      const result = await tagsService.getAllTags();
      expect(tagsRepository.find).toHaveBeenCalled();
      expect(result).toEqual('Returns all tags');
    });
  });

  describe('getSingleTag', () => {
    it('get a single tag from the repository', async () => {
      (tagsRepository.findOne as jest.Mock).mockResolvedValue(mockTag);
      expect(tagsRepository.findOne).not.toHaveBeenCalled();
      const result = await tagsService.getSingleTag(0);
      expect(result).toEqual(mockTag);
      expect(tagsRepository.findOne).toHaveBeenCalledWith({
        id: mockTag.id,
      });
    });

    it('throws an error when the tag does not exist', async () => {
      (tagsRepository.findOne as jest.Mock).mockResolvedValue(null);
      expect(tagsService.getSingleTag(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('addTag', () => {
    it('add a tag to the repository', async () => {
      (tagsRepository.findOne as jest.Mock).mockResolvedValue(null);
      (tagsRepository.save as jest.Mock).mockResolvedValue(mockTag);
      const result = await tagsService.addTag(mockAddTag);
      expect(result).toEqual(mockTag);
    });
  });

  describe('deleteTag', () => {
    it('deletes a tag from the repository', async () => {
      (tagsRepository.findOne as jest.Mock).mockResolvedValue(mockTag);
      expect(tagsRepository.findOne).not.toHaveBeenCalled();
      const result = await tagsService.deleteTag(0);
      expect(tagsRepository.findOne).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
});
