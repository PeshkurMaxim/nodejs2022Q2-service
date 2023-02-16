import { Allow, IsInt, IsString } from 'class-validator';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { DeepPartial } from 'typeorm';

export class CreateTrackDto {
  @IsString()
  name: string;

  @Allow()
  artistId: string; // refers to Artist

  @Allow()
  albumId: string; // refers to Album

  @IsInt()
  duration: number;
}
