import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movies.entity';
import { MovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAllMovies(): Promise<Movie[]> {
    return this.moviesService.getAllMovies();
  }

  @Get(':id')
  getSingleMovie(@Param('id') movieId: number): Promise<Movie> {
    return this.moviesService.getSingleMovie(movieId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteMovie(@Param('id') movieId: number): Promise<void> {
    return this.moviesService.deleteMovie(movieId);
  }

  @Post()
  // @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
  addMovie(@Body() movieDto: MovieDto): Promise<Movie> {
    return this.moviesService.addMovie(movieDto);
  }

  @Patch(':id')
  // @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
  updateMovie(
    @Body() updateMovieDto: UpdateMovieDto,
    @Param('id') movieId: number,
  ): Promise<Movie> {
    return this.moviesService.updateMovie(movieId, updateMovieDto);
  }
}
