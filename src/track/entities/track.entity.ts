export class Track {
  id: string;
  name: string;
  duration: number;
  albumId: string | null;
  artistId: string | null;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
