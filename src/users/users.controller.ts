import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  HttpCode,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Params } from '../shared/params.dto';

import { APP_ROUTES } from '../common/constants';
import { generateNotFoundException } from '../common/utils';

@Controller(APP_ROUTES.USER)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new User(user));
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    return new User(newUser);
  }

  @Get(':id')
  async findOne(@Param() { id }: Params) {
    const user = await this.usersService.findOne(id);

    if (!user) generateNotFoundException(APP_ROUTES.USER);

    return new User(user);
  }

  @Put(':id')
  async update(
    @Param() { id }: Params,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const user = await this.usersService.findOne(id);

    if (!user) generateNotFoundException(APP_ROUTES.USER);

    await this.usersService.update(user, updatePasswordDto);
    return new User(user);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param() { id }: Params) {
    const user = await this.usersService.findOne(id);

    if (!user) generateNotFoundException(APP_ROUTES.USER);
    return await this.usersService.remove(id);
  }
}
