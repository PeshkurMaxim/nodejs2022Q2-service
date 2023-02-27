import { IsArray } from 'class-validator';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';

export class FavoriteDto {
  @IsArray()
  artists: Artist[]; // favorite artists ids

  @IsArray()
  albums: Album[]; // favorite albums ids

  @IsArray()
  tracks: Track[];
}
