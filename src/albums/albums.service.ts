import { Injectable, NotFoundException } from '@nestjs/common';
import CreateAlbumDto from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly tracksService: TracksService) {}

  private albums: Album[] = [];

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      artistId: null,
      ...createAlbumDto,
    };

    this.albums.push(newAlbum);
    return newAlbum;
  }

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    const album = this.albums.find((album) => album.id == id);
    if (!album) throw new NotFoundException();

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.findOne(id);

    const updatedAlbum = {
      ...album,
      ...updateAlbumDto,
    };

    this.albums[this.albums.indexOf(album)] = updatedAlbum;

    return updatedAlbum;
  }

  remove(id: string) {
    const album = this.findOne(id);
    this.tracksService.removeAlbum(id);

    this.albums.splice(this.albums.indexOf(album), 1);
  }
}
