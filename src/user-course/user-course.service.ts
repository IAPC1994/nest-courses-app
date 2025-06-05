import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserCourseDto } from './dto/create-user-course.dto';
import { UpdateUserCourseDto } from './dto/update-user-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCourse } from './entities/user-course.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class UserCourseService {
  constructor(
    @InjectRepository(UserCourse)
    private readonly userCourseRepository: Repository<UserCourse>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}
  async create(createUserCourseDto: CreateUserCourseDto) {
    try {
      const { userId, courseId } = createUserCourseDto;
      const user = await this.userRepository.findOne({ where: { id: userId } });
      const course = await this.courseRepository.findOne({
        where: { id: courseId },
      });
      const userCourse = await this.userCourseRepository.create({
        user,
        course,
      });
      await this.userCourseRepository.save(userCourse);
      return userCourse;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  findAll() {
    return `This action returns all userCourse`;
  }

  findOne(id: string) {
    return `This action returns a #${id} userCourse`;
  }

  update(id: string, updateUserCourseDto: UpdateUserCourseDto) {
    return `This action updates a #${id} userCourse`;
  }

  remove(id: string) {
    return `This action removes a #${id} userCourse`;
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
