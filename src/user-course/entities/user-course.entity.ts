import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['user', 'course'])
export class UserCourse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.userCourses, { eager: true })
  user: User;

  @ManyToOne(() => Course, (course) => course.userCourses, { eager: true })
  course: Course;

  @Column('bool', {
    default: false,
  })
  completed: boolean;

  @Column('bool', {
    default: false,
  })
  favorite: boolean;

  @CreateDateColumn()
  createAt: Date;
}
