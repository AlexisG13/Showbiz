import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movies.entity';
import { MovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesRepository } from './repositories/movies.repository';
import { UpdateMovieQueryDto } from './dto/update-movie-query.dto';
import { TagsRepository } from '../tags/repositories/tags.repository';
import { Rent } from 'src/users/entities/rent.entity';
import { Repository, AdvancedConsoleLogger } from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { RentMovieDto } from './dto/rent-movie.dto';
import { Order } from 'src/users/entities/order.entity ';
import { BuyMovieDto } from './dto/buy-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MoviesRepository)
    private readonly moviesRepository: MoviesRepository,
    @InjectRepository(TagsRepository)
    private readonly tagsRepository: TagsRepository,
    @InjectRepository(Rent)
    private readonly rentRepository: Repository<Rent>,
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  getAllMovies(): Promise<Movie[]> {
    return this.moviesRepository.find({ order: { title: 'ASC' }, where: { isActive: true } });
  }

  async getSingleMovie(movieId: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOne({ id: movieId });
    if (!movie) {
      throw new NotFoundException('The movie does not exist');
    }
    return movie;
  }

  async deleteMovie(movieId: number): Promise<void> {
    const movie = await this.moviesRepository.findOne({ id: movieId });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    movie.isActive = false;
    this.moviesRepository.save(movie);
    return;
  }

  async addMovie(movieDto: MovieDto): Promise<Movie> {
    let availableTags = await this.tagsRepository
      .createQueryBuilder('tag')
      .where('tag.title IN (:...tags)', { tags: movieDto.tags })
      .getMany();
    if (!availableTags) {
      availableTags = [];
    }
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

  async returnMovie(rentId: number): Promise<Rent> {
    try {
      const rent = await this.rentRepository.findOne(rentId);
      if (!rent || rent.devolution === true) {
        throw new NotFoundException('The rent does not exist');
      }
      const movie = await this.moviesRepository.findOne(rent.movieId);
      movie.stock += 1;
      await this.moviesRepository.save(movie);
      rent.devolution = true;
      rent.isActive = false;
      return await this.rentRepository.save(rent);
    } catch (err) {
      throw new InternalServerErrorException('An error ocurred when contacting the database');
    }
  }

  async rentMovie(user: User, movieId: number, rentDto: RentMovieDto): Promise<Rent> {
    const movie = await this.moviesRepository.findOne({ id: movieId });
    if (!movie) {
      throw new NotFoundException('The movie does not exist');
    }
    if (!movie.stock) {
      throw new ConflictException('The movie is out of stock or unavailable');
    }
    movie.stock -= 1;
    await this.moviesRepository.save(movie);
    return this.rentRepository.save({
      user,
      movie,
      devolution: false,
      devolutionDate: rentDto.devolutionDate,
      rentDate: new Date(),
    });
  }

  async buyMovie(user: User, movieId: number, buyMovie: BuyMovieDto): Promise<Order> {
    const movie = await this.moviesRepository.findOne({ id: movieId });
    if (!movie || !movie.isActive) {
      throw new NotFoundException('The movie does not exist');
    }
    if (!movie.stock || movie.stock < buyMovie.quantity) {
      throw new ConflictException('The movie is out of stock');
    }
    const total = buyMovie.quantity * movie.salePrice;
    movie.stock -= buyMovie.quantity;
    await this.moviesRepository.save(movie);
    return this.ordersRepository.save({
      user,
      movie,
      total,
      quantity: buyMovie.quantity,
      boughtDate: new Date(),
    });
  }
}
