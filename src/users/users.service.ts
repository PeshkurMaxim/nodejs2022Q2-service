import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-user-password.dto';
import { UserDto } from './dto/user.dto';
import { DB } from '../DB/db.service';

@Injectable()
export class UsersService {
  constructor(private database: DB) {}

  create(user: CreateUserDto): UserDto {
    const newUser: User = {
      id: uuidv4(),
      ...user,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.database.users.push(newUser);
    return this.userToReturnFormat(newUser);
  }

  findAll(): UserDto[] {
    return this.database.users.map((user) => this.userToReturnFormat(user));
  }

  findOne(id: string): UserDto {
    const user = this.database.users.find((user) => user.id == id);
    if (!user) throw new NotFoundException();

    return this.userToReturnFormat(user);
  }

  updatePassword(id: string, passwords: UpdatePasswordDto): UserDto {
    const user = this.database.users.find((user) => user.id == id);
    if (!user) throw new NotFoundException();

    if (user.password !== passwords.oldPassword)
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);

    const updatedUser = {
      ...user,
      password: passwords.newPassword,
      version: ++user.version,
      updatedAt: Date.now(),
    };

    this.database.users[this.database.users.indexOf(user)] = updatedUser;

    return this.userToReturnFormat(updatedUser);
  }

  delete(id: string) {
    const user = this.database.users.find((user) => user.id == id);
    if (!user) throw new NotFoundException();

    this.database.users.splice(this.database.users.indexOf(user), 1);
  }

  userToReturnFormat(user: User): UserDto {
    const { password, ...returnUser } = user;
    return returnUser;
  }
}
