import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity ';
import { Repository, Not } from 'typeorm';
import { MoviesRepository } from 'src/movies/repositories/movies.repository';
import { Rent } from './entities/rent.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(MoviesRepository)
    private readonly movieRepository: MoviesRepository,
    @InjectRepository(Rent)
    private readonly rentRepository: Repository<Rent>,
  ) {}

  async buyMovie(userId: number, movieId: number): Promise<Order> {
    const movie = await this.movieRepository.findOne({ id: movieId });
    if (!movie) {
      throw new NotFoundException('The movie does not exist');
    }
    if (!movie.stock || !movie.availability) {
      throw new ConflictException('The movie is out of stock or unavailable');
    }
    movie.stock -= 1;
    await this.movieRepository.save(movie);
    return this.orderRepository.save({ userId, movieId, boughtDate: new Date() });
  }

  async rentMovie(userId: number, movieId: number): Promise<Rent> {
    const movie = await this.movieRepository.findOne({ id: movieId });
    if (!movie) {
      throw new NotFoundException('The movie does not exist');
    }
    if (!movie.stock || !movie.availability) {
      throw new ConflictException('The movie is out of stock or unavailable');
    }
    movie.stock -= 1;
    await this.movieRepository.save(movie);
    return this.rentRepository.save({ userId, movieId, rentDate: new Date() });
  }

  async returnMovie(userId: number, movieId: number): Promise<void> {
    const rent = await this.rentRepository.findOne({ userId, movieId });
    if (!rent) {
      throw new NotFoundException('The user has not rented this movie');
    }
    rent.devolution = true;
    await this.rentRepository.save(rent);
    const movie = await this.movieRepository.findOne({ id: movieId });
    movie.stock += 1;
    await this.movieRepository.save(movie);
  }
}
