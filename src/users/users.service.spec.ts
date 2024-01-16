import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

describe('UsersService', () => {
  let module: TestingModule;
  let usersService: UsersService;
  let usersRepository: DeepMocked<Repository<UserEntity>>;

  beforeEach(async () => {
    jest.clearAllMocks();

    module = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: () => createMock(Repository),
        },
        UsersService,
      ],
    }).compile();

    usersService = module.get(UsersService);
    usersRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of paginated records', async () => {
      const findAndCountSpy = jest.spyOn(usersRepository, 'findAndCount');
      const pagination = plainToInstance(PaginationDto, {
        page: 1,
        limit: 50,
      });

      findAndCountSpy.mockResolvedValue([[], 1]);

      await usersService.findAll(pagination);

      expect(findAndCountSpy).toHaveBeenCalledTimes(1);
      expect(findAndCountSpy).toHaveBeenCalledWith({
        skip: 0,
        take: 50,
        order: {
          createdAt: 'desc',
        },
      });
    });
  });

  describe('create', () => {
    it('should insert a new record', async () => {
      const insertSpy = jest.spyOn(usersRepository, 'insert');
      const payload = plainToInstance(CreateUserDto, {
        firstName: 'test',
        lastName: 'test',
        email: 'test@test.com',
      });

      await insertSpy.mockResolvedValue({
        identifiers: [{ id: 1 }],
        generatedMaps: [],
        raw: {},
      });

      await usersService.create(payload);
      expect(insertSpy).toHaveBeenCalledTimes(1);
      expect(insertSpy).toHaveBeenCalledWith(payload);
    });
  });
});
