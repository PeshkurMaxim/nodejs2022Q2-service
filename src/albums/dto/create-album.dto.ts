import { Allow, IsNumber, IsString } from 'class-validator';
import { Artist } from 'src/artists/entities/artist.entity';
import { DeepPartial } from 'typeorm';

export default class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @Allow()
  artistId: string;
}
