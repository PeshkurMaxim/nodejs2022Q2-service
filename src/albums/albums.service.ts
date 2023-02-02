import { Injectable, NotFoundException } from '@nestjs/common';
import CreateAlbumDto from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';
import { DB } from 'src/DB/db.service';

@Injectable()
export class AlbumsService {
  constructor(private database: DB) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      artistId: null,
      ...createAlbumDto,
    };

    this.database.albums.push(newAlbum);
    return newAlbum;
  }

  findAll(): Album[] {
    return this.database.albums;
  }

  findOne(id: string): Album {
    const album = this.database.albums.find((album) => album.id == id);
    if (!album) throw new NotFoundException();

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.findOne(id);

    const updatedAlbum = {
      ...album,
      ...updateAlbumDto,
    };

    this.database.albums[this.database.albums.indexOf(album)] = updatedAlbum;

    return updatedAlbum;
  }

  remove(id: string) {
    const album = this.findOne(id);

    this.database.tracks = this.database.tracks.map((track) => {
      if (track.albumId === id) {
        return {
          ...track,
          albumId: null,
        };
      } else {
        return track;
      }
    });

    this.database.albums.splice(this.database.albums.indexOf(album), 1);
  }
}
