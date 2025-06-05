import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserCourseService } from './user-course.service';
import { UserCourseController } from './user-course.controller';
import { UserCourse } from './entities/user-course.entity';
import { UsersModule } from 'src/users/users.module';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  controllers: [UserCourseController],
  providers: [UserCourseService],
  imports: [TypeOrmModule.forFeature([UserCourse]), UsersModule, CoursesModule],
  exports: [TypeOrmModule],
})
export class UserCourseModule {}
