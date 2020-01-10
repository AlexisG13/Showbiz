/* istanbul ignore file */
import { Tag } from 'src/tags/entities/tags.entity';
import { Movie } from '../entities/movies.entity';

export class UpdateMovieQueryDto {
  id: number;
  title: string;
  description: string;
  poster: string;
  stock: number;
  trailer: string;
  salePrice: number;
  availability: boolean;
  tags: Tag[];
  constructor(movie: Movie) {
    this.id = movie.id;
    this.title = movie.title;
    this.description = movie.description;
    this.poster = movie.poster;
    this.stock = movie.stock;
    this.trailer = movie.trailer;
    this.salePrice = movie.salePrice;
    this.availability = movie.availability;
    this.tags = movie.tags;
  }
}
