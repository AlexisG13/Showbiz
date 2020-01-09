import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { TagsRepository } from 'src/tags/repositories/tags.repository';
import { MoviesRepository } from './repositories/movies.repository';

const mockMoviesRepository = () => ({
  find: jest.fn(),
});
const mockTagsRepository = () => ({});

describe('MoviesService', () => {
  let moviesService: MoviesService;
  let tagsRepository: TagsRepository;
  let moviesRepository: MoviesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: TagsRepository, useFactory: mockTagsRepository },
        { provide: MoviesRepository, useFactory: mockMoviesRepository },
      ],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
    moviesRepository = module.get<MoviesRepository>(MoviesRepository);
    tagsRepository = module.get<TagsRepository>(TagsRepository);
  });

  it('should be defined', () => {
    expect(moviesService).toBeDefined();
    expect(moviesRepository).toBeDefined();
    expect(tagsRepository).toBeDefined();
  });

  describe('getAllMovies', () => {
    it('get all movies from the repository', async () => {
      (moviesRepository.find as jest.Mock).mockResolvedValue('Returns all movies');
      expect(moviesRepository.find).not.toHaveBeenCalled();
      const result = await moviesService.getAllMovies();
      expect(moviesRepository.find).toHaveBeenCalled();
      expect(result).toEqual('Returns all movies');
    });
  });
});
