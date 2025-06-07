import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('int')
  year: number;

  @Column('uuid', { nullable: true, name: 'artist_id' })
  artistId: string | null;

  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artist_id' })
  artist?: Artist;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
