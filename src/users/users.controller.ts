import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  ParseIntPipe,
  Param,
  UnauthorizedException,
  Patch,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { UsersService } from './users.service';
import { AccessToken } from './dto/access-token.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/users.entity';
import { GetUser } from './decorators/get-user.decorator';
import { PasswordChangeDto } from './dto/password-change.dto';
import { AuthService } from 'src/auth/auth.service';
import { Order } from './entities/order.entity ';
import { InsertResult } from 'typeorm';
import { Rent } from './entities/rent.entity';
import { RentMovieDto } from './dto/rent-movie.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authcredentialsDTo: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authcredentialsDTo);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  signIn(@Body() authcredentialsDTo: AuthCredentialsDto): Promise<AccessToken> {
    return this.authService.login(authcredentialsDTo);
  }

  @Patch('/:userId/password')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  changePassword(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() passwordDto: PasswordChangeDto,
    @GetUser() user: User,
  ): Promise<void> {
    if (user.id !== userId) {
      throw new UnauthorizedException('Unathorized userId in request');
    }
    return this.authService.changePassword(user, passwordDto);
  }

  @Post(':userId/movies:movieId/order')
  @UseGuards(AuthGuard())
  buyMovie(
    @Param('userId') userId: number,
    @Param('movieId') movieId: number,
    @GetUser() user: User,
  ): Promise<Order> {
    return this.usersService.buyMovie(user, movieId);
  }

  @Post(':userId/movies/:movieId/rent')
  @UseGuards(AuthGuard('jwt'))
  rentMovie(
    @Param('userId') userId: number,
    @Param('movieId') movieId: number,
    @Body() rentDto: RentMovieDto,
    @GetUser() user: User,
  ): Promise<Rent> {
    return this.usersService.rentMovie(user, movieId, rentDto);
  }

  @Patch(':userId/rentals/rentalId')
  @UseGuards(AuthGuard('jwt'))
  returnMovie(@Param('rentalId') rentalId: number, @GetUser() user: User): Promise<Rent> {
    return this.usersService.returnMovie(rentalId);
  }
}
