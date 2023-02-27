import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDTO: CreateUserDto): Promise<User> {
    const passwordHash = await this.hashData(createUserDTO.password);
    return await this.usersRepository.save({
      ...createUserDTO,
      password: passwordHash,
    });
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
    const passwordMatches = await bcrypt.compare(
      passwords.oldPassword,
      user.password,
    );

    if (!passwordMatches) return null;

    const passwordHash = await this.hashData(passwords.newPassword);
    const updatedUser = {
      ...user,
      password: passwordHash,
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

  findByLogin(login: string) {
    return this.usersRepository.findOneBy({ login });
  }

  hashData(data: string) {
    return bcrypt.hash(data, 12);
  }
}
