import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { initialData } from './data/seed-data';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';
import { UserCourse } from 'src/user-course/entities/user-course.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(UserCourse)
    private readonly userCourseRepository: Repository<UserCourse>,
  ) {}

  async runSeed() {
    await this.deleteTables();
    await this.insertUsers();
    await this.insertCourses();
    return 'Seed Executed';
  }

  private async deleteTables() {
    const queryBuilderUserCourse =
      this.userCourseRepository.createQueryBuilder();
    await queryBuilderUserCourse.delete().where({}).execute();

    const queryBuilderUser = this.userRepository.createQueryBuilder();
    await queryBuilderUser.delete().where({}).execute();

    const queryBuilderCourse = this.courseRepository.createQueryBuilder();
    await queryBuilderCourse.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;
    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

    await this.userRepository.save(seedUsers);
  }

  private async insertCourses() {
    const seedCourses = initialData.courses;
    const courses: Course[] = [];

    seedCourses.forEach((course) => {
      courses.push(this.courseRepository.create(course));
    });

    await this.courseRepository.save(seedCourses);
  }
}
