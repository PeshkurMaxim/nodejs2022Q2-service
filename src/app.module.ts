import { Module } from '@nestjs/common';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { Database } from './DB/db.module';
import { FavoritesModule } from './favorites/favorites.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    Database,
    FavoritesModule,
    UserModule,
  ],
})
export class AppModule {}
