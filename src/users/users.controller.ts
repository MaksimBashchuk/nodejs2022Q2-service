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
  ForbiddenException,
  HttpCode,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Params } from '../shared/params.dto';

import { APP_ROUTES, WRONG_PASS_RESPONSE } from '../common/constants';
import { generateNotFoundException } from '../common/utils';

@Controller(APP_ROUTES.USER)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new User(user));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    return new User(newUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param() { id }: Params) {
    const user = await this.usersService.findOne(id);

    if (!user) generateNotFoundException(APP_ROUTES.USER);

    return new User(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(
    @Param() { id }: Params,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const user = await this.usersService.findOne(id);

    if (!user) generateNotFoundException(APP_ROUTES.USER);
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException(WRONG_PASS_RESPONSE);
    }

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
