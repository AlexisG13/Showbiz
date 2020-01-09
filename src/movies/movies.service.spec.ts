import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { TagsRepository } from '../tags/repositories/tags.repository';
import { MoviesRepository } from './repositories/movies.repository';
import { Movie } from './entities/movies.entity';

const mockMoviesRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
});
const mockTagsRepository = () => ({});
const mockMovie = {
  id: 0,
  title: 'Test title',
  description: 'Test description',
  salePrice: 0,
  stock: 0,
  availability: true,
  likes: 0,
  poster: 'test poster',
  trailer: 'test trailer',
};

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

  describe('getSingleMovie', () => {
    it('get a single movie from the repository', async () => {
      (moviesRepository.findOne as jest.Mock).mockResolvedValue(mockMovie);
      expect(moviesRepository.findOne).not.toHaveBeenCalled();
      const result = await moviesService.getSingleMovie(0);
      expect(result).toEqual(mockMovie);
      expect(moviesRepository.findOne).toHaveBeenCalledWith({
        id: mockMovie.id,
      });
    });
  });
});
