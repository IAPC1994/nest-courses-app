import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';

describe('Courses Service', () => {
  let service: CoursesService;
  let repo: Repository<Course>;

  const mockCourseRepo = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: getRepositoryToken(Course),
          useValue: mockCourseRepo,
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    repo = module.get<Repository<Course>>(getRepositoryToken(Course));
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return all courses', async () => {
    const result = [{ id: '1', title: 'React', price: 100 }];
    mockCourseRepo.find.mockResolvedValue(result);

    const paginationDto = {
      limit: 10,
      offset: 0,
    };
    const courses = await service.findAll(paginationDto);

    expect(courses).toEqual(result);
    expect(mockCourseRepo.find).toHaveBeenCalledWith({
      order: {
        createdAt: 'DESC',
      },
      take: 10,
      skip: 0,
    });
  });
});
