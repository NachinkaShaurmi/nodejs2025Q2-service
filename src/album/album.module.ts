import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { FavsModule } from 'src/favs/favs.module';
import { Album } from './entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), forwardRef(() => FavsModule)],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
