import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { albumDB } from 'src/db/inMemoryDB';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  constructor(private readonly trackService: TrackService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const id = crypto.randomUUID();

    const newAlbum = new Album({
      id,
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    });

    const album = albumDB.create(id, newAlbum);

    return new Album(album);
  }

  findAll() {
    return albumDB.findAll().map((album) => new Album(album));
  }

  findOne(id: string) {
    const album = albumDB.findOne(id);

    if (!album) throw new NotFoundException('Album not found');

    return new Album(album);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = albumDB.findOne(id);

    if (!album) throw new NotFoundException('Album not found');

    const updatedAlbum = albumDB.update(id, {
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
      artistId: updateAlbumDto.artistId,
    });

    return new Album(updatedAlbum);
  }

  remove(id: string) {
    const album = albumDB.findOne(id);

    if (!album) throw new NotFoundException('Album not found');

    const removed = albumDB.remove(id);

    if (!removed) {
      throw new NotFoundException('Failed to remove album');
    }

    this.trackService.removeAlbum(id);

    return;
  }

  removeArtist(artistId: string) {
    const albums = albumDB
      .findAll()
      .filter((album) => album.artistId === artistId);

    if (albums.length === 0) return;

    albums.forEach((album) => {
      albumDB.update(album.id, { artistId: null });
    });
  }
}
