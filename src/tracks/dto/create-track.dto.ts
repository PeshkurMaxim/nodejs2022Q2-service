import { Allow, IsInt, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @Allow()
  artistId?: string | null; // refers to Artist

  @Allow()
  albumId?: string | null; // refers to Album

  @IsInt()
  duration: number;
}
