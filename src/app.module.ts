import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { Database } from './DB/db.module';

@Module({
  imports: [UsersModule, ArtistsModule, TracksModule, AlbumsModule, Database],
})
export class AppModule {}
