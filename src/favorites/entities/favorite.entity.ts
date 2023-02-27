import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Artist)
  @JoinTable()
  artists: Artist[]; // favorite artists ids

  @ManyToMany(() => Album)
  @JoinTable()
  albums: Album[]; // favorite albums ids

  @ManyToMany(() => Track)
  @JoinTable()
  tracks: Track[];
}
