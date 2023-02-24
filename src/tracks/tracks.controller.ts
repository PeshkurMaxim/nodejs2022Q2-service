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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ParseUUIDPipe } from 'src/common/pipes/parce-uuid.pipe';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.tracksService.create(createTrackDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.tracksService.findOne(id);
    if (!track) throw new NotFoundException();
    // console.log(track);

    return track;
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = await this.tracksService.update(id, updateTrackDto);
    if (!track) throw new NotFoundException();

    return track;
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.tracksService.remove(id);
    if (!track) throw new NotFoundException();
  }
}
