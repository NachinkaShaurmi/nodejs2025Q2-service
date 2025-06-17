import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { Favorite } from './entities/fav.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @Inject(ArtistService)
    private readonly artistService: ArtistService,
    @Inject(AlbumService)
    private readonly albumService: AlbumService,
    @Inject(TrackService)
    private readonly trackService: TrackService,
  ) {}

  async findAll() {
    const artistFavorites = await this.favoriteRepository.find({
      where: { artistId: Not(IsNull()) },
      relations: ['artist'],
    });

    const albumFavorites = await this.favoriteRepository.find({
      where: { albumId: Not(IsNull()) },
      relations: ['album'],
    });

    const trackFavorites = await this.favoriteRepository.find({
      where: { trackId: Not(IsNull()) },
      relations: ['track'],
    });

    return {
      artists: artistFavorites.map((fav) => fav.artist).filter(Boolean),
      albums: albumFavorites.map((fav) => fav.album).filter(Boolean),
      tracks: trackFavorites.map((fav) => fav.track).filter(Boolean),
    };
  }

  async addArtist(id: string) {
    try {
      await this.artistService.findOne(id);
    } catch (error) {
      throw new UnprocessableEntityException('Artist not found');
    }

    const existing = await this.favoriteRepository.findOneBy({ artistId: id });
    if (existing) return;

    const favorite = this.favoriteRepository.create({ artistId: id });
    await this.favoriteRepository.save(favorite);
  }

  async addAlbum(id: string) {
    try {
      await this.albumService.findOne(id);
    } catch (error) {
      throw new UnprocessableEntityException('Album not found');
    }

    const existing = await this.favoriteRepository.findOneBy({ albumId: id });
    if (existing) return;

    const favorite = this.favoriteRepository.create({ albumId: id });
    await this.favoriteRepository.save(favorite);
  }

  async addTrack(id: string) {
    try {
      await this.trackService.findOne(id);
    } catch (error) {
      throw new UnprocessableEntityException('Track not found');
    }

    const existing = await this.favoriteRepository.findOneBy({ trackId: id });
    if (existing) return;

    const favorite = this.favoriteRepository.create({ trackId: id });
    await this.favoriteRepository.save(favorite);
  }

  async removeArtist(id: string) {
    const favorite = await this.favoriteRepository.findOneBy({ artistId: id });
    if (favorite) {
      await this.favoriteRepository.remove(favorite);
    }
  }

  async removeAlbum(id: string) {
    const favorite = await this.favoriteRepository.findOneBy({ albumId: id });
    if (favorite) {
      await this.favoriteRepository.remove(favorite);
    }
  }

  async removeTrack(id: string) {
    const favorite = await this.favoriteRepository.findOneBy({ trackId: id });
    if (favorite) {
      await this.favoriteRepository.remove(favorite);
    }
  }
}
