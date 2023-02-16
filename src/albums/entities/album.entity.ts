import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'smallint', default: new Date().getFullYear() })
  year: number;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];

  @Column({ nullable: true })
  artistId: string;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
