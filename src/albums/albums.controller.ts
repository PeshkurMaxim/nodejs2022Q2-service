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
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ParseUUIDPipe } from 'src/common/pipes/parce-uuid.pipe';
import { AlbumsService } from './albums.service';
import CreateAlbumDto from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumsService.findOne(id);
    if (!album) throw new NotFoundException();

    return album;
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = await this.albumsService.update(id, updateAlbumDto);
    if (!album) throw new NotFoundException();
    // console.log(album);

    return album;
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumsService.remove(id);
    if (!album) throw new NotFoundException();
  }
}
