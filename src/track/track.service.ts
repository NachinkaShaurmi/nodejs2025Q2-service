import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { trackDB } from 'src/db/inMemoryDB';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const id = crypto.randomUUID();

    const newTrack = new Track({
      id,
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      albumId: createTrackDto.albumId,
      artistId: createTrackDto.artistId,
    });

    const track = trackDB.create(id, newTrack);

    return new Track(track);
  }

  findAll() {
    return trackDB.findAll().map((track) => new Track(track));
  }

  findOne(id: string) {
    const track = trackDB.findOne(id);

    if (!track) throw new NotFoundException('Track not found');

    return new Track(track);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = trackDB.findOne(id);

    if (!track) throw new NotFoundException('Track not found');

    const updatedTrack = trackDB.update(id, {
      name: updateTrackDto.name,
      duration: updateTrackDto.duration,
      albumId: updateTrackDto.albumId,
      artistId: updateTrackDto.artistId,
    });

    return new Track(updatedTrack);
  }

  remove(id: string) {
    const track = trackDB.findOne(id);

    if (!track) throw new NotFoundException('Track not found');

    const removed = trackDB.remove(id);

    if (!removed) {
      throw new NotFoundException('Failed to remove track');
    }

    return;
  }

  removeArtist(artistId: string) {
    const tracks = trackDB
      .findAll()
      .filter((track) => track.artistId === artistId);

    if (tracks.length === 0) return;

    tracks.forEach((track) => {
      trackDB.update(track.id, { artistId: null });
    });
  }

  removeAlbum(albumId: string) {
    const tracks = trackDB
      .findAll()
      .filter((track) => track.albumId === albumId);

    if (tracks.length === 0) return;

    tracks.forEach((track) => {
      trackDB.update(track.id, { albumId: null });
    });
  }
}
