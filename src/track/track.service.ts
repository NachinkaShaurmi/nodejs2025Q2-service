import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = this.trackRepository.create(createTrackDto);

    return this.trackRepository.save(track);
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
    const result = await this.trackRepository.update(id, updateTrackDto);

    if (result.affected === 0) {
      throw new NotFoundException('Track not found');
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.trackRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Track not found');
    }

    return { id };
  }
}
