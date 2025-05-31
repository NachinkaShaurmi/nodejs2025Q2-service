import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { artistDB } from 'src/db/inMemoryDB';
import { Artist } from './entities/artist.entity';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistService {
  constructor(private readonly albumService: AlbumService) {}

  create(createArtistDto: CreateArtistDto) {
    const id = crypto.randomUUID();

    const newArtist = new Artist({
      id,
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });

    const artist = artistDB.create(id, newArtist);

    return new Artist(artist);
  }

  findAll() {
    return artistDB.findAll().map((artist) => new Artist(artist));
  }

  findOne(id: string) {
    const artist = artistDB.findOne(id);

    if (!artist) throw new NotFoundException('Artist not found');

    return new Artist(artist);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = artistDB.findOne(id);

    if (!artist) throw new NotFoundException('Artist not found');

    const updatedArtist = artistDB.update(id, {
      name: updateArtistDto.name,
      grammy: updateArtistDto.grammy,
    });

    return new Artist(updatedArtist);
  }

  remove(id: string) {
    const artist = artistDB.findOne(id);

    if (!artist) throw new NotFoundException('Artist not found');

    const removed = artistDB.remove(id);

    if (!removed)
      throw new InternalServerErrorException('Failed to remove artist');

    this.albumService.removeArtist(id);

    return;
  }
}
