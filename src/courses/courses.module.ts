import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from './entities/course.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CoursesController],
  imports: [TypeOrmModule.forFeature([Course]), AuthModule],
  providers: [CoursesService],
  exports: [TypeOrmModule, CoursesService],
})
export class CoursesModule {}
