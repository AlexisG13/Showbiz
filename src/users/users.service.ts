import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity ';
import { Repository, Not, InsertResult } from 'typeorm';
import { MoviesRepository } from 'src/movies/repositories/movies.repository';
import { Rent } from './entities/rent.entity';
import { User } from './entities/users.entity';
import { RentMovieDto } from './dto/rent-movie.dto';

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

  async buyMovie(user: User, movieId: number): Promise<Order> {
    const movie = await this.movieRepository.findOne({ id: movieId });
    if (!movie) {
      throw new NotFoundException('The movie does not exist');
    }
    if (!movie.stock) {
      throw new ConflictException('The movie is out of stock or unavailable');
    }
    movie.stock -= 1;
    await this.movieRepository.save(movie);
    return this.orderRepository.save({
      user,
      movie,
      boughtDate: new Date(),
    });
  }

  async rentMovie(user: User, movieId: number, rentDto: RentMovieDto): Promise<Rent> {
    const movie = await this.movieRepository.findOne({ id: movieId });
    if (!movie) {
      throw new NotFoundException('The movie does not exist');
    }
    if (!movie.stock) {
      throw new ConflictException('The movie is out of stock or unavailable');
    }
    movie.stock -= 1;
    await this.movieRepository.save(movie);
    return this.rentRepository.save({
      user,
      movie,
      devolution: false,
      devolutionDate: rentDto.devolutionDate,
      rentDate: new Date(),
    });
  }

  async returnMovie(rentId: number): Promise<Rent> {
    try {
      const rent = await this.rentRepository.findOne(rentId);
      if (!rent || rent.devolution === true) {
        throw new NotFoundException('The rent does not exist');
      }
      rent.devolution = true;
      const movie = await this.movieRepository.findOne(rent.movieId);
      movie.stock += 1;
      await this.movieRepository.save(movie);
      return await this.rentRepository.save(rent);
    } catch (err) {
      throw new InternalServerErrorException('An error ocurred when contacting the database');
    }
  }
}
