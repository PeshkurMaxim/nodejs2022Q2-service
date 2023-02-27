import { Allow, IsInt, IsString } from 'class-validator';

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
