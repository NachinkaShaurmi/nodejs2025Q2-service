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
    const artist = this.artistRepository.create({
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });

    await this.artistRepository.save(artist);

    return artist;
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
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) throw new NotFoundException('Artist not found');

    Object.assign(artist, {
      name: !isUndefined(updateArtistDto.name)
        ? updateArtistDto.name
        : artist.name,
      grammy: !isUndefined(updateArtistDto.grammy)
        ? updateArtistDto.grammy
        : artist.grammy,
    });

    await this.artistRepository.save(artist);

    return artist;
  }

  async remove(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) throw new NotFoundException('Artist not found');

    await this.artistRepository.remove(artist);

    return { id };
  }
}
