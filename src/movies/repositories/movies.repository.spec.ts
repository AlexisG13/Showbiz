import { MoviesRepository } from './movies.repository';
import { Test } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';

const mockMovieDto = {
  title: 'Test title',
  description: 'Test description',
  poster: 'Test poster',
  stock: 0,
  trailer: 'Test trailer',
  salePrice: 0,
  tags: [],
  availability: false,
};

const mockMovie = {
  title: 'Test title',
  id: 0,
  description: 'Test description',
  poster: 'Test poster',
  stock: 0,
  trailer: 'Test trailer',
  salePrice: 0,
  tags: [],
  availability: false,
};

describe('MoviesRepository', () => {
  let moviesRepository: MoviesRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MoviesRepository],
    }).compile();

    moviesRepository = module.get<MoviesRepository>(MoviesRepository);
  });

  it('should be defined', () => {
    expect(moviesRepository).toBeDefined();
  });

  describe('addMovie', () => {
    beforeEach(() => {
      moviesRepository.save = jest.fn().mockResolvedValue(mockMovie);
    });

    it('adds a movie', async () => {
      moviesRepository.findOne = jest.fn().mockResolvedValue(null);
      const result = await moviesRepository.addMovie(mockMovieDto, []);
      expect(result).toEqual(mockMovie);
    });

    it('throws an error if the movie already exists', async () => {
      moviesRepository.findOne = jest.fn().mockResolvedValue(true);
      expect(moviesRepository.addMovie(mockMovieDto, [])).rejects.toThrowError(ConflictException);
    });
  });
});
