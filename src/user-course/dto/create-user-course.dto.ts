import { IsUUID } from 'class-validator';

export class CreateUserCourseDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  courseId: string;
}
