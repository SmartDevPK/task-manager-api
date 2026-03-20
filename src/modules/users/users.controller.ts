// src/modules/users/users.controller.ts
import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users') // Plural is better for REST conventions
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // -----------------------------
  // CREATE
  // -----------------------------
  @Post()
  async createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    return this.usersService.createUser(name, email, password);
  }

  // -----------------------------
  // READ
  // -----------------------------
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOneById(+id);
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string): Promise<User | null> {
    return this.usersService.findOneByEmail(email);
  }

  // -----------------------------
  // UPDATE
  // -----------------------------
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    return this.usersService.update(+id, updateData);
  }

  // -----------------------------
  // DELETE
  // -----------------------------
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}
