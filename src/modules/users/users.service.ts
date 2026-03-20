// src/modules/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // -----------------------------
  // CREATE METHODS
  // -----------------------------

  // Create a new user with hashed password
  async createUser(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ name, email, password: hashedPassword });
    return this.usersRepository.save(user);
  }

  // Generic create method (for internal use)
  create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  // -----------------------------
  // READ METHODS
  // -----------------------------

  // Get all users
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // Get a user by email
  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Get a user by ID
  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  // -----------------------------
  // UPDATE METHOD
  // -----------------------------

  // Update an existing user
  async update(id: number, updateData: Partial<User>): Promise<User> {
    const user = await this.findOneById(id); // Ensure user exists
    Object.assign(user, updateData);         // Merge updates
    return this.usersRepository.save(user);  // Save updated user
  }

  // -----------------------------
  // DELETE METHOD
  // -----------------------------

  // Delete a user by ID
  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
