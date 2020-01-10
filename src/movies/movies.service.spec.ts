import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { TagsRepository } from '../tags/repositories/tags.repository';
import { MoviesRepository } from './repositories/movies.repository';
import { NotFoundException } from '@nestjs/common';

const mockMoviesRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  addMovie: jest.fn().mockResolvedValue(mockMovie),
});

const mockTagsRepository = () => ({
  createQueryBuilder: jest.fn(() => ({
    where: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnValueOnce(null),
  })),
});

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
  tags: [],
};

const mockAddMovie = {
  title: 'New Test title',
  description: ' Test description',
  salePrice: 0,
  stock: 0,
  availability: true,
  likes: 0,
  poster: 'test poster',
  trailer: 'test trailer',
  tags: [],
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

    it('throws an error when the movie does not exist', async () => {
      (moviesRepository.findOne as jest.Mock).mockResolvedValue(null);
      expect(moviesService.getSingleMovie(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('addMovie', () => {
    it('add a movie to the repository', async () => {
      const result = await moviesService.addMovie(mockAddMovie);
      expect(result).toEqual(mockMovie);
    });
  });

  describe('deleteMovie', () => {
    it('deletes a movie from the repository', async () => {
      (moviesRepository.findOne as jest.Mock).mockResolvedValue(mockMovie);
      expect(moviesRepository.findOne).not.toHaveBeenCalled();
      const result = await moviesService.deleteMovie(0);
      expect(moviesRepository.findOne).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
});
