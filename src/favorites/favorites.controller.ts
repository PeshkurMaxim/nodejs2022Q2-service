import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ParseUUIDPipe } from 'src/common/pipes/parce-uuid.pipe';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.favoritesService.addTrack(id))
      throw new UnprocessableEntityException();

    return 'Track succesful added';
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.favoritesService.addAlbum(id))
      throw new UnprocessableEntityException();

    return 'Album succesful added';
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.favoritesService.addArtist(id))
      throw new UnprocessableEntityException();

    return 'Artist succesful added';
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.favoritesService.removeTrack(id)) throw new NotFoundException();
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.favoritesService.removeAlbum(id)) throw new NotFoundException();
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.favoritesService.removeArtist(id)) throw new NotFoundException();
  }
}
