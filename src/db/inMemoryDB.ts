import { User } from 'src/user/entities/user.entity';

interface Entity {
  updatedAt?: number;
  createdAt?: number;
  version?: number;
}

class InMemoryDB<T extends Entity> {
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

    if (updatedEntity.updatedAt) updatedEntity.updatedAt = Date.now();
    if (updatedEntity.version) updatedEntity.version += 1;

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

// Usage example:
// const userDB = new InMemoryDB<User>();
// userDB.create('1', new User({ id: '1', login: 'user1', password: 'pass1', createdAt: new Date(), updatedAt: new Date(), version: 1 }));
// const allUsers = userDB.findAll();
// const user = userDB.findOne('1');
// userDB.update('1', new User({ id: '1', login: 'user1', password: 'newpass', createdAt: new Date(), updatedAt: new Date(), version: 2 }));
// userDB.remove('1');
