import { Injectable } from '@nestjs/common';
import { DB } from 'src/DB/db.service';
import { FavoriteDto } from './dto/favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private database: DB) {}

  addTrack(id: string): number | void {
    if (!this.database.tracks.find((track) => track.id === id)) return;
    return this.database.favorites.tracks.push(id);
  }

  addAlbum(id: string): number | void {
    if (!this.database.albums.find((album) => album.id === id)) return;
    return this.database.favorites.albums.push(id);
  }

  addArtist(id: string): number | void {
    if (!this.database.artists.find((artist) => artist.id === id)) return;
    return this.database.favorites.artists.push(id);
  }

  findAll() {
    const favorites: FavoriteDto = {
      tracks: this.findTracks(this.database.favorites.tracks),
      albums: this.findAlbums(this.database.favorites.albums),
      artists: this.findArtists(this.database.favorites.artists),
    };
    return favorites;
  }

  findTracks(id: string[]) {
    const tracks = this.database.tracks.filter((track) =>
      id.includes(track.id),
    );

    return tracks;
  }

  findAlbums(id: string[]) {
    const albums = this.database.albums.filter((album) =>
      id.includes(album.id),
    );

    return albums;
  }

  findArtists(id: string[]) {
    const artists = this.database.artists.filter((artist) =>
      id.includes(artist.id),
    );

    return artists;
  }

  removeTrack(id: string): string[] | void {
    const index = this.database.favorites.tracks.indexOf(id);
    if (index < 0) return;

    return this.database.favorites.tracks.splice(index, 1);
  }

  removeAlbum(id: string): string[] | void {
    const index = this.database.favorites.albums.indexOf(id);
    if (index < 0) return;

    return this.database.favorites.albums.splice(index, 1);
  }

  removeArtist(id: string): string[] | void {
    const index = this.database.favorites.artists.indexOf(id);
    if (index < 0) return;

    return this.database.favorites.artists.splice(index, 1);
  }
}
