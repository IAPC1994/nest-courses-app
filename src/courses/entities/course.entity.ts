import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  @Column('bool', {
    default: false,
  })
  favorite: boolean;

  @Column('bool', {
    default: false,
  })
  completed: boolean;

  @ManyToMany(() => User, (user) => user.courses)
  @JoinTable()
  users: User[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
