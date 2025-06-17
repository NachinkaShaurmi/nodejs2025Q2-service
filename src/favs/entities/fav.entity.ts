import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { IsOptional, IsUUID } from 'class-validator';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';
import { Exclude } from 'class-transformer';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: true, name: 'artist_id' })
  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @Column('uuid', { nullable: true, name: 'album_id' })
  @IsOptional()
  @IsUUID()
  albumId: string | null;

  @Column('uuid', { nullable: true, name: 'track_id' })
  @IsOptional()
  @IsUUID()
  trackId: string | null;

  @Index()
  @ManyToOne(() => Artist, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artist_id' })
  @Exclude()
  artist?: Artist;

  @Index()
  @ManyToOne(() => Album, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'album_id' })
  @Exclude()
  album?: Album;

  @Index()
  @ManyToOne(() => Track, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'track_id' })
  @Exclude()
  track?: Track;

  constructor(partial: Partial<Favorite> = {}) {
    Object.assign(this, partial);
  }
}
