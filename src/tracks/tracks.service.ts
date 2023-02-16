import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}
  create(createTrackDto: CreateTrackDto): Promise<Track> {
    return this.tracksRepository.save(createTrackDto);
  }

  findAll(): Promise<Track[]> {
    return this.tracksRepository.find();
  }

  findOne(id: string): Promise<Track> {
    return this.tracksRepository.findOneBy({ id: id });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.findOne(id);
    if (!track) return null;

    const updatedTrack = {
      ...track,
      ...updateTrackDto,
    };

    return this.tracksRepository.save(updatedTrack);
  }

  async remove(id: string): Promise<Track> {
    const track = await this.findOne(id);
    if (!track) return null;

    await this.tracksRepository.delete({ id: id });
    return track;
  }
}
