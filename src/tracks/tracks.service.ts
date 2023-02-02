import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';
import { DB } from 'src/DB/db.service';

@Injectable()
export class TracksService {
  constructor(private database: DB) {}

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      artistId: null,
      albumId: null,
      ...createTrackDto,
    };

    this.database.tracks.push(newTrack);
    return newTrack;
  }

  findAll(): Track[] {
    return this.database.tracks;
  }

  findOne(id: string): Track {
    const track = this.database.tracks.find((track) => track.id == id);
    if (!track) throw new NotFoundException();

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.findOne(id);

    const updatedTrack = {
      ...track,
      ...updateTrackDto,
    };

    this.database.tracks[this.database.tracks.indexOf(track)] = updatedTrack;

    return updatedTrack;
  }

  remove(id: string) {
    const track = this.findOne(id);

    this.database.tracks.splice(this.database.tracks.indexOf(track), 1);
  }
}
