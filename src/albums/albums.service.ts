import { Injectable } from '@nestjs/common';
import CreateAlbumDto from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}
  create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumsRepository.save(createAlbumDto);
  }

  findAll(): Promise<Album[]> {
    return this.albumsRepository.find();
  }

  findOne(id: string): Promise<Album> {
    return this.albumsRepository.findOneBy({ id: id });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id);
    if (!album) return null;

    const updatedAlbum = {
      ...album,
      ...updateAlbumDto,
    };

    return this.albumsRepository.save(updatedAlbum);
  }

  async remove(id: string): Promise<Album> {
    const album = await this.findOne(id);
    if (!album) return null;

    await this.albumsRepository.delete({ id: id });
    return album;
  }
}
