import { UserCourse } from 'src/user-course/entities/user-course.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
  })
  title: string;

  @Column('text', {
    default: 'No description',
  })
  description: string;

  @Column('decimal', {
    default: 0,
  })
  price: number;

  @OneToMany(() => UserCourse, (userCourses) => userCourses.course)
  userCourses: UserCourse[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
