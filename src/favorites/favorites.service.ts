import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
  ) {}

  async addTrack(id: string) {
    const track = await this.tracksRepository.findOneBy({ id: id });
    if (!track) return;

    const favorite = await this.findAll();
    favorite.tracks.push(track);
    return await this.favoritesRepository.save(favorite);
  }

  async addAlbum(id: string) {
    const album = await this.albumsRepository.findOneBy({ id: id });
    if (!album) return;

    const favorite = await this.findAll();
    favorite.albums.push(album);
    return await this.favoritesRepository.save(favorite);
  }

  async addArtist(id: string) {
    const artist = await this.artistsRepository.findOneBy({ id: id });
    if (!artist) return;

    const favorite = await this.findAll();
    favorite.artists.push(artist);
    return await this.favoritesRepository.save(favorite);
  }

  async findAll() {
    return await this.favoritesRepository.findOne({
      where: { id: 1 },
      relations: {
        tracks: true,
        albums: true,
        artists: true,
      },
    });
  }

  async removeTrack(id: string) {
    const favorite = await this.findAll();
    const trackIndex = favorite.tracks.findIndex((track) => track.id === id);

    if (trackIndex < 0) return null;

    favorite.tracks = favorite.tracks.slice(trackIndex, 1);
    return await this.favoritesRepository.save(favorite);
  }

  async removeAlbum(id: string) {
    const favorite = await this.findAll();
    const albumIndex = favorite.albums.findIndex((album) => album.id === id);

    if (albumIndex < 0) return null;

    favorite.albums = favorite.albums.slice(albumIndex, 1);
    return await this.favoritesRepository.save(favorite);
  }

  async removeArtist(id: string) {
    const favorite = await this.findAll();
    const artistIndex = favorite.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (artistIndex < 0) return null;

    favorite.artists = favorite.artists.slice(artistIndex, 1);
    return await this.favoritesRepository.save(favorite);
  }
}
