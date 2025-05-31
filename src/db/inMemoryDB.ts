import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { User } from 'src/user/entities/user.entity';

class InMemoryDB<T> {
  private db: Map<string, T> = new Map();

  create(id: string, entity: T): T | undefined {
    if (this.db.has(id)) return;

    this.db.set(id, entity);

    return entity;
  }

  findAll(): T[] {
    return Array.from(this.db.values());
  }

  findOne(id: string): T | undefined {
    return this.db.get(id);
  }

  update(id: string, entity: Partial<T>): T | undefined {
    if (!this.db.has(id)) return;

    const existingEntity = this.db.get(id);
    const updatedEntity = { ...existingEntity, ...entity };

    if (
      'updatedAt' in updatedEntity &&
      typeof updatedEntity.updatedAt === 'number'
    ) {
      updatedEntity.updatedAt = Date.now();
    }

    if (
      'version' in updatedEntity &&
      typeof updatedEntity.version === 'number'
    ) {
      updatedEntity.version = (updatedEntity.version || 0) + 1;
    }

    this.db.set(id, updatedEntity);

    return updatedEntity;
  }

  remove(id: string): boolean {
    if (!this.db.has(id)) return false;

    this.db.delete(id);

    return true;
  }
}

export const userDB = new InMemoryDB<User>();

export const artistDB = new InMemoryDB<Artist>();

export const albumDB = new InMemoryDB<Album>();
