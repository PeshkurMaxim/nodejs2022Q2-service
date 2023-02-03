import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { ParseUUIDPipe } from 'src/common/pipes/parce-uuid.pipe';
import { AlbumsService } from './albums.service';
import CreateAlbumDto from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumsService.findOne(id);
    if (!album) throw new NotFoundException();

    return album;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = this.albumsService.update(id, updateAlbumDto);
    if (!album) throw new NotFoundException();

    return album;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumsService.remove(id);
    if (!album) throw new NotFoundException();
  }
}
