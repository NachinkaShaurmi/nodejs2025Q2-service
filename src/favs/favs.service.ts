import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { Album } from 'src/album/entities/album.entity';
import { ArtistService } from 'src/artist/artist.service';
import { favAlbumDB, favArtistDB, favTrackDB } from 'src/db/inMemoryDB';
import { Track } from 'src/track/entities/track.entity';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class FavsService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,

    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,

    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {}

  findAll() {
    const tracks = favTrackDB.findAll();
    const albums = favAlbumDB.findAll();
    const artists = favArtistDB.findAll();

    return { tracks, albums, artists };
  }

  addTrack(id: string) {
    let track: Track;
    try {
      track = this.trackService.findOne(id);
    } catch (error) {
      throw new UnprocessableEntityException('Track not found');
    }
    const favTrack = favTrackDB.create(id, track);

    return favTrack;
  }

  addAlbum(id: string) {
    let album: Album;
    try {
      album = this.albumService.findOne(id);
    } catch (error) {
      throw new UnprocessableEntityException('Album not found');
    }
    const favAlbum = favAlbumDB.create(id, album);

    return favAlbum;
  }

  addArtist(id: string) {
    let artist;
    try {
      artist = this.artistService.findOne(id);
    } catch (error) {
      throw new UnprocessableEntityException('Artist not found');
    }
    const favArtist = favArtistDB.create(id, artist);

    return favArtist;
  }

  removeTrack(id: string) {
    const track = favTrackDB.findOne(id);

    if (!track) throw new NotFoundException('Track not found in favs');

    const removed = favTrackDB.remove(id);

    if (!removed)
      throw new NotFoundException('Failed to remove track from favs');

    return;
  }

  removeAlbum(id: string) {
    const album = favAlbumDB.findOne(id);

    if (!album) throw new NotFoundException('Album not found in favs');

    const removed = favAlbumDB.remove(id);

    if (!removed)
      throw new NotFoundException('Failed to remove album from favs');

    return;
  }

  removeArtist(id: string) {
    const artist = favArtistDB.findOne(id);

    if (!artist) throw new NotFoundException('Artist not found in favs');

    const removed = favArtistDB.remove(id);

    if (!removed)
      throw new NotFoundException('Failed to remove artist from favs');

    return;
  }
}
