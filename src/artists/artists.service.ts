import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.artistsRepository.save(createArtistDto);
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistsRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    return await this.artistsRepository.findOneBy({ id: id });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.findOne(id);
    if (!artist) return null;

    const updatedArtist = {
      ...artist,
      ...updateArtistDto,
    };

    return await this.artistsRepository.save(updatedArtist);
  }

  async remove(id: string) {
    const artist = await this.findOne(id);
    if (!artist) return null;

    await this.artistsRepository.delete({ id: id });
    return artist;
  }
}
