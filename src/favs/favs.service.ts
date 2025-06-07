import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { Favorite } from './entities/fav.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  async findAll() {
    const favorites = await this.favoriteRepository.find();

    const artists = [];
    const albums = [];
    const tracks = [];

    for (const fav of favorites) {
      try {
        const artist = await this.artistService.findOne(fav.artistId);
        artists.push(artist);
      } catch (error) {}
    }

    for (const fav of favorites) {
      try {
        const album = await this.albumService.findOne(fav.albumId);
        albums.push(album);
      } catch (error) {}
    }

    for (const fav of favorites) {
      try {
        const track = await this.trackService.findOne(fav.trackId);
        tracks.push(track);
      } catch (error) {}
    }

    return { artists, albums, tracks };
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
