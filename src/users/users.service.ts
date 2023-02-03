import { Injectable } from '@nestjs/common';
import { DB } from 'src/DB/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private database: DB) {}

  create(user: CreateUserDto): User {
    const newUser: User = {
      id: uuidv4(),
      ...user,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.database.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.database.users;
  }

  findOne(id: string): User | null {
    const user = this.database.users.find((user) => user.id == id);

    return user;
  }

  updatePassword(user: User, passwords: UpdatePasswordDto): User | null {
    if (user.password !== passwords.oldPassword) return null;

    const updatedUser = {
      ...user,
      password: passwords.newPassword,
      version: ++user.version,
      updatedAt: Date.now(),
    };

    this.database.users[this.database.users.indexOf(user)] = updatedUser;

    return updatedUser;
  }

  delete(id: string): User | null {
    const user = this.database.users.find((user) => user.id == id);
    if (!user) return null;

    this.database.users.splice(this.database.users.indexOf(user), 1);
    return user;
  }
}
