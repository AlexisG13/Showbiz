import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movies.entity';
import { MovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesRepository } from './repositories/movies.repository';
import { TagsRepository } from 'src/tags/repositories/tags.repository';
import { UpdateMovieQueryDto } from './dto/update-movie-query.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MoviesRepository)
    private readonly moviesRepository: MoviesRepository,
    @InjectRepository(TagsRepository)
    private readonly tagsRepository: TagsRepository,
  ) {}

  getAllMovies(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  async getSingleMovie(movieId: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOne({ id: movieId });
    if (!movie) {
      throw new NotFoundException('The movie does not exist');
    }
    return movie;
  }

  async deleteMovie(movieId: number): Promise<void> {
    const result = await this.moviesRepository.delete({ id: movieId });
    if (!result) {
      throw new NotFoundException('Movie not found');
    }
    return;
  }

  async addMovie(movieDto: MovieDto): Promise<Movie> {
    const availableTags = await this.tagsRepository
      .createQueryBuilder('tag')
      .where('tag.title IN (:...tags)', { tags: movieDto.tags })
      .getMany();
    return this.moviesRepository.addMovie(movieDto, availableTags);
  }

  async updateMovie(movieId: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.moviesRepository.findOne(movieId);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    if (await this.moviesRepository.findOne({ title: updateMovieDto.title })) {
      throw new ConflictException('A movie with the provided title already exists');
    }
    const { tags, ...movieFields } = updateMovieDto;
    const updatedMovie = new UpdateMovieQueryDto({ ...movie, ...movieFields });
    if (updateMovieDto.tags) {
      updatedMovie.tags = await this.tagsRepository
        .createQueryBuilder('tag')
        .where('tag.title IN (:...tags)', { tags: updateMovieDto.tags })
        .getMany();
    }
    return this.moviesRepository.save(updatedMovie);
  }
}
