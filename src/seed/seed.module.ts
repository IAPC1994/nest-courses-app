import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { CoursesModule } from 'src/courses/courses.module';
import { UserCourseModule } from 'src/user-course/user-course.module';

@Module({
  controllers: [SeedController],
  imports: [AuthModule, UsersModule, CoursesModule, UserCourseModule],
  providers: [SeedService],
})
export class SeedModule {}
