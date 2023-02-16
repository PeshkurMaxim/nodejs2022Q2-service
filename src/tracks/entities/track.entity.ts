import { Transform } from 'class-transformer';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @RelationId((track: Track) => track.artist)
  artistId: string;

  @ManyToOne(() => Album, (album) => album.tracks, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId' })
  @Transform(({ value }) => value.id)
  album: Album;

  @RelationId((track: Track) => track.album)
  albumId: string;

  @Column({ type: 'integer' })
  duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
