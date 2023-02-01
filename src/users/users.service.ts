import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/updatePassword-user.dto';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
      login: 'string',
      password: 'string',
      version: 1,
      createdAt: 1,
      updatedAt: 2,
    },
  ];

  create(user: CreateUserDto) {
    const newUser: User = {
      id: uuidv4(),
      ...user,
      version: 1.0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(newUser);
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((user) => user.id == id);
    if (!user) throw new NotFoundException();

    return user;
  }

  updatePassword(id: string, passwords: UpdatePasswordDto) {
    const user = this.findOne(id);

    if (user.password !== passwords.oldPassword)
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);

    this.users[this.users.indexOf(user)] = {
      ...user,
      password: passwords.newPassword,
    };
  }

  userToReturnFormat(user: User) {
    const { password, ...returnUser } = user;
    return returnUser;
  }
}
