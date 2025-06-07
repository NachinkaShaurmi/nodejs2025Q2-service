import { Injectable, NotFoundException } from '@nestjs/common';
import { isUndefined } from '../helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = this.artistRepository.create(createArtistDto);

    return this.artistRepository.save(artist);
  }

  async findAll() {
    return this.artistRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) throw new NotFoundException('Artist not found');

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const result = await this.artistRepository.update(id, updateArtistDto);

    if (result.affected === 0) {
      throw new NotFoundException('Artist not found');
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.artistRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Artist not found');
    }

    return { id };
  }
}
