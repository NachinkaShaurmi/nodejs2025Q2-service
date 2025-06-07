import { Injectable, NotFoundException } from '@nestjs/common';
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
    const album = this.albumRepository.create(createAlbumDto);

    return this.albumRepository.save(album);
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
    const result = await this.albumRepository.update(id, updateAlbumDto);

    if (result.affected === 0) {
      throw new NotFoundException('Album not found');
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.albumRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Album not found');
    }

    return { id };
  }
}
