import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Like, Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      const course = await this.courseRepository.create(createCourseDto);
      await this.courseRepository.save(course);
      return course;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const courses = await this.courseRepository.find({
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
    });
    return courses;
  }

  async findOne(term: string) {
    let course: Course;
    if (isUUID(term)) {
      course = await this.courseRepository.findOne({ where: { id: term } });
    } else {
      const queryBuilder = this.courseRepository.createQueryBuilder();
      course = await queryBuilder
        .where('UPPER(title) like :title', {
          title: `%${term.toUpperCase()}%`,
        })
        .getOne();
    }

    if (!course) throw new NotFoundException(`Course not found`);

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseRepository.preload({
      id,
      ...updateCourseDto,
    });
    if (!course) throw new NotFoundException(`Course with ID: ${id} not found`);

    return this.courseRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.findOne(id);
    if (!course) throw new NotFoundException(`Course with ID: ${id} not found`);
    await this.courseRepository.remove(course);
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    console.error('DB Error', {
      message: error.message,
      detail: error.detail,
      stack: error.stack,
    });
    throw new InternalServerErrorException('Please check server logs');
  }
}
