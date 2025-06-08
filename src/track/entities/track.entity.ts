import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Exclude } from 'class-transformer';

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

  @Index()
  @ManyToOne(() => Album, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'album_id' })
  @Exclude()
  album?: Album;

  @Index()
  @ManyToOne(() => Artist, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artist_id' })
  @Exclude()
  artist?: Artist;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
