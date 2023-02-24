import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ParseUUIDPipe } from 'src/common/pipes/parce-uuid.pipe';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistsService.findOne(id);
    if (!artist) throw new NotFoundException();

    return artist;
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistsService.update(id, updateArtistDto);
    if (!artist) throw new NotFoundException();

    return artist;
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistsService.remove(id);
    if (!artist) throw new NotFoundException();
  }
}
