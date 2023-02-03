import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ParseUUIDPipe } from 'src/common/pipes/parce-uuid.pipe';
import { User } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/update-password-user.dto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll().map((user) => new User(user));
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return new User(this.userService.findOne(id));
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return new User(this.userService.create(createUserDto));
  }

  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return new User(this.userService.updatePassword(id, updatePasswordDto));
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    this.userService.delete(id);
  }
}
