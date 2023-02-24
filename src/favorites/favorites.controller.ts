import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ParseUUIDPipe } from 'src/common/pipes/parce-uuid.pipe';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(AccessTokenGuard)
  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.favoritesService.addTrack(id)))
      throw new UnprocessableEntityException();

    return 'Track succesful added';
  }

  @UseGuards(AccessTokenGuard)
  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.favoritesService.addAlbum(id)))
      throw new UnprocessableEntityException();

    return 'Album succesful added';
  }

  @UseGuards(AccessTokenGuard)
  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.favoritesService.addArtist(id)))
      throw new UnprocessableEntityException();

    return 'Artist succesful added';
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.favoritesService.removeTrack(id)))
      throw new NotFoundException();
  }

  @UseGuards(AccessTokenGuard)
  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.favoritesService.removeAlbum(id)))
      throw new NotFoundException();
  }

  @UseGuards(AccessTokenGuard)
  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.favoritesService.removeArtist(id)))
      throw new NotFoundException();
  }
}
