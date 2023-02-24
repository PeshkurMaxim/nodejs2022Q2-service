import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDTO: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(createUserDTO);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async updatePassword(
    user: User,
    passwords: UpdatePasswordDto,
  ): Promise<User> {
    if (user.password !== passwords.oldPassword) return null;

    const updatedUser = {
      ...user,
      password: passwords.newPassword,
    };

    return await this.usersRepository.save(updatedUser);
  }

  async delete(id: string): Promise<User> {
    const user = await this.findOne(id);
    if (!user) return null;

    await this.usersRepository.delete({ id: id });
    return user;
  }

  async update(id: string, data: Partial<CreateUserDto>) {
    return this.usersRepository.update({ id }, data);
  }

  async findByLogin(login: string) {
    return this.usersRepository.findOneBy({ login });
  }
}
