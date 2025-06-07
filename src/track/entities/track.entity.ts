import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('int')
  duration: number;

  @Column('uuid', { nullable: true, name: 'album_id' })
  albumId: string | null;

  @Column('uuid', { nullable: true, name: 'artist_id' })
  artistId: string | null;

  @ManyToOne(() => Album, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'album_id' })
  album?: Album;

  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artist_id' })
  artist?: Artist;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
