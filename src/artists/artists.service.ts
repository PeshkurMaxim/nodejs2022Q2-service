import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { DB } from 'src/DB/db.service';

@Injectable()
export class ArtistsService {
  constructor(private database: DB) {}

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    this.database.artists.push(newArtist);
    return newArtist;
  }

  findAll(): Artist[] {
    return this.database.artists;
  }

  findOne(id: string): Artist {
    const artist = this.database.artists.find((artist) => artist.id == id);
    if (!artist) throw new NotFoundException();

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.findOne(id);

    const updatedArtist = {
      ...artist,
      ...updateArtistDto,
    };

    this.database.artists[this.database.artists.indexOf(artist)] =
      updatedArtist;

    return updatedArtist;
  }

  remove(id: string) {
    const artist = this.findOne(id);

    this.database.tracks = this.database.tracks.map((track) => {
      if (track.artistId === id) {
        return {
          ...track,
          artistId: null,
        };
      } else {
        return track;
      }
    });

    this.database.artists.splice(this.database.artists.indexOf(artist), 1);
  }
}
