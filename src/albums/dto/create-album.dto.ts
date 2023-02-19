import { Allow, IsNumber, IsString } from 'class-validator';

export default class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @Allow()
  artistId: string;
}
