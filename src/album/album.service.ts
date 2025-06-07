import { Injectable, NotFoundException } from '@nestjs/common';
import { isUndefined } from '../helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = this.albumRepository.create({
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    });

    await this.albumRepository.save(album);
    return album;
  }

  async findAll() {
    return this.albumRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) throw new NotFoundException('Album not found');

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) throw new NotFoundException('Album not found');

    Object.assign(album, {
      name: !isUndefined(updateAlbumDto.name)
        ? updateAlbumDto.name
        : album.name,
      year: !isUndefined(updateAlbumDto.year)
        ? updateAlbumDto.year
        : album.year,
      artistId: !isUndefined(updateAlbumDto.artistId)
        ? updateAlbumDto.artistId
        : album.artistId,
    });

    await this.albumRepository.save(album);

    return album;
  }

  async remove(id: string) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) throw new NotFoundException('Album not found');

    await this.albumRepository.remove(album);

    return { id };
  }
}
