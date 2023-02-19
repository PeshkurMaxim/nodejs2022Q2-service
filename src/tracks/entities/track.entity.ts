import { Transform } from 'class-transformer';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
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

  @Column({ nullable: true })
  artistId: string;

  @ManyToOne(() => Album, (album) => album.tracks, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId' })
  @Transform(({ value }) => value.id)
  album: Album;

  @Column({ nullable: true })
  albumId: string;

  @Column({ type: 'integer' })
  duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
