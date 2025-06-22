import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserCourseService } from './user-course.service';
import { CreateUserCourseDto } from './dto/create-user-course.dto';

@Controller('user-course')
export class UserCourseController {
  constructor(private readonly userCourseService: UserCourseService) {}

  @Post()
  create(@Body() createUserCourseDto: CreateUserCourseDto) {
    return this.userCourseService.create(createUserCourseDto);
  }

  @Get('user/:id')
  findAllByUserId(@Param('id', ParseUUIDPipe) id: string) {
    return this.userCourseService.findAllByUserId(id);
  }

  @Get('course/:id')
  findAllByCourseId(@Param('id', ParseUUIDPipe) id: string) {
    return this.userCourseService.findAllByCourseId(id);
  }
}
