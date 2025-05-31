import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { userDB } from 'src/db/inMemoryDB';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const id = crypto.randomUUID();

    const newUser = new User({
      id,
      login: createUserDto.login,
      password: createUserDto.password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    });

    const user = userDB.create(id, newUser);

    return new User(user);
  }

  findAll() {
    return userDB.findAll().map((user) => new User(user));
  }

  findOne(id: string) {
    const user = userDB.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    return new User(user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = userDB.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    if (updateUserDto.oldPassword !== user.password)
      throw new ForbiddenException('Old password is incorrect');

    const updatedUser = userDB.update(id, {
      password: updateUserDto.newPassword,
    });

    return new User(updatedUser);
  }

  remove(id: string) {
    const user = userDB.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    const isRemoved = userDB.remove(id);

    if (!isRemoved)
      throw new InternalServerErrorException('Failed to remove user');

    return;
  }
}
