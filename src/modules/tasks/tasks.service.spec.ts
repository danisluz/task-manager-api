import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('TasksService', () => {
  let service: TasksService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: {
            task: {
              create: jest.fn().mockResolvedValue({
                id: '1',
                title: 'Mock Task',
                description: 'Mock Description',
                done: false,
              }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar uma tarefa', async () => {
    const taskData = { title: 'Test Task', description: 'Testing', done: false, userId: '1' };
    const result = await service.create(taskData);
    expect(result).toEqual({
      id: '1',
      title: 'Mock Task',
      description: 'Mock Description',
      done: false,
    });
  });
});
