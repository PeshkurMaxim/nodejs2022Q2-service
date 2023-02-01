import { IsInt, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  artistId?: string | null; // refers to Artist

  albumId?: string | null; // refers to Album

  @IsInt()
  duration: number;
}
