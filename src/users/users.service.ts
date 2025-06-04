import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset } = paginationDto;
    const users = await this.userRepository.find({
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID: ${id} not found`);

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) throw new NotFoundException(`User with ID: ${id} not found`);
    return this.userRepository.save(user);
  }

  async changeUserActiveStatus(id: string) {
    const user = await this.findOne(id);
    await this.userRepository.update(id, {
      isActive: !user.isActive,
    });
    return `User with ID: ${id} active status changed`;
  }
}
