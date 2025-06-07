import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { isUndefined } from 'src/helpers';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = this.trackRepository.create({
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      albumId: createTrackDto.albumId,
      artistId: createTrackDto.artistId,
    });

    await this.trackRepository.save(track);

    return track;
  }

  async findAll() {
    return this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) throw new NotFoundException('Track not found');

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) throw new NotFoundException('Track not found');

    Object.assign(track, {
      name: isUndefined(updateTrackDto.name) ? track.name : updateTrackDto.name,
      duration: isUndefined(updateTrackDto.duration)
        ? track.duration
        : updateTrackDto.duration,
      albumId: isUndefined(updateTrackDto.albumId)
        ? track.albumId
        : updateTrackDto.albumId,
      artistId: isUndefined(updateTrackDto.artistId)
        ? track.artistId
        : updateTrackDto.artistId,
    });

    await this.trackRepository.save(track);

    return track;
  }

  async remove(id: string) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) throw new NotFoundException('Track not found');

    await this.trackRepository.remove(track);

    return { id };
  }
}
