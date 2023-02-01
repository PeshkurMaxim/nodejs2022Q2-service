import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      artistId: null,
      albumId: null,
      ...createTrackDto,
    };

    this.tracks.push(newTrack);
    return newTrack;
  }

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track {
    const track = this.tracks.find((track) => track.id == id);
    if (!track) throw new NotFoundException();

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.findOne(id);

    const updatedTrack = {
      ...track,
      ...updateTrackDto,
    };

    this.tracks[this.tracks.indexOf(track)] = updatedTrack;

    return updatedTrack;
  }

  remove(id: string) {
    const track = this.findOne(id);

    this.tracks.splice(this.tracks.indexOf(track), 1);
  }

  removeArtist(artistId: string) {
    this.tracks = this.tracks.map((track) => {
      if (track.artistId === artistId) {
        return {
          ...track,
          artistId: null,
        };
      } else {
        return track;
      }
    });
  }

  removeAlbum(albumId: string) {
    this.tracks = this.tracks.map((track) => {
      if (track.albumId === albumId) {
        return {
          ...track,
          albumId: null,
        };
      } else {
        return track;
      }
    });
  }
}
