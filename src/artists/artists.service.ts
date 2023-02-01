import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistsService {
  private readonly artists: Artist[] = [];

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    this.artists.push(newArtist);
    return newArtist;
  }

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist {
    const artist = this.artists.find((artist) => artist.id == id);
    if (!artist) throw new NotFoundException();

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.findOne(id);

    const updatedArtist = {
      ...artist,
      ...updateArtistDto,
    };

    this.artists[this.artists.indexOf(artist)] = updatedArtist;

    return updatedArtist;
  }

  remove(id: string) {
    const artist = this.findOne(id);

    this.artists.splice(this.artists.indexOf(artist), 1);
  }
}
